package com.app.service;

import java.util.List;

import com.app.dto.AddProductDto;
import com.app.dto.RespProductDto;
import com.app.entities.Category;
import com.app.entities.Product;

public interface ProductService {
//	Add new product
	Product addNewProduct(Product product);
	
//	Get all products
	List<Product> getAllProducts();
	
//	Get Product by it's id
	Product findProductById(Long prodId);
	
//	Get Products by it's category
//	List<Product> getProductsByCategory(Category type);
	
//	Update product details
	Product updateProductDetails(Product product);
	
//	Delete Product details
	String deleteProductDetails(Long prodId);
	
	RespProductDto addProductInCategory(AddProductDto dto);
}
