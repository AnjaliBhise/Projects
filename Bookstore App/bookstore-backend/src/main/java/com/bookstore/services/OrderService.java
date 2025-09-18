package com.bookstore.services;

import java.util.List;
import com.bookstore.entities.Order;

public interface OrderService {
    Order placeOrder(Order order);
    List<Order> getOrdersByUser(Long userId);
    Order getOrderById(Long orderId);
    void cancelOrder(Long orderId);
    void updateOrderStatus(Long orderId, String status);
    List<Order> getAllOrders();
    void deleteOrder(Long orderId);
}
