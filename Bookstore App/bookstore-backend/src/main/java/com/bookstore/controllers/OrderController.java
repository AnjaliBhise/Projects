package com.bookstore.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.config.JwtUtil;
import com.bookstore.dtos.OrderRequestDto;
import com.bookstore.entities.Order;
import com.bookstore.entities.User;
import com.bookstore.repositories.OrderRepository;
import com.bookstore.repositories.UserRepository;
import com.bookstore.services.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private OrderRepository orderRepository;
    
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestBody OrderRequestDto orderRequest,
                                            @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);
        User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setBookTitle(orderRequest.getBookTitle());
        order.setShippingAddress(user.getAddress());
        order.setStatus("ORDER PLACED");
        order.setPaymentMethod("COD");
        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(orderRequest.getPrice());

        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.ok(savedOrder);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userId));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/cancel/{orderId}")
    public ResponseEntity<String> cancelOrder(@PathVariable Long orderId) {
        orderService.cancelOrder(orderId);
        return ResponseEntity.ok("Order cancelled successfully.");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/deliver/{orderId}")
    public ResponseEntity<String> markAsDelivered(@PathVariable Long orderId) {
        orderService.updateOrderStatus(orderId, "DELIVERED");
        return ResponseEntity.ok("Order marked as delivered successfully.");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
    
    @DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
    String deleteOrder(@PathVariable Long id)
	{
		orderService.deleteOrder(id);
		return "Book deleted sucessfully";
	}
}
