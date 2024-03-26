package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AddProductDto;
import com.app.dto.RespProductDto;
import com.app.entities.Category;
import com.app.entities.Product;
import com.app.service.ProductService;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:8080")
public class ProductController {
	@Autowired
	private ProductService prodService;
	
	@PostMapping
	public Product addNewProduct(@RequestBody Product product) {
		return prodService.addNewProduct(product);
	}
	
	@GetMapping
	public List<Product> getAllProducts(){
		return prodService.getAllProducts();
	}

	@GetMapping("/{prodId}")
	public Product findProductById(Long prodId) {
		return prodService.findProductById(prodId);
	}
	
	@GetMapping("/category/{type}")
	public List<Product> getProductsByCategory(Category type) {
		return prodService.getProductsByCategory(type);
	}
	
	@PutMapping("/{prodId}")
	public Product updateProductDetails(@RequestBody Product product) {
		return prodService.updateProductDetails(product);
	}

	@DeleteMapping("/{prodId}")
	public String deleteProductDetails(Long prodId) {
		return prodService.deleteProductDetails(prodId);
	}
	
	@PostMapping
	public RespProductDto addProductToCategory(@RequestBody @Valid AddProductDto prodto)
	{
		
		System.out.println("Inside product service"+prodto);
		return prodService.addProductInCategory(prodto);
		
	}
}
