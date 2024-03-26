package com.app.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.CategoryDao;
import com.app.dao.ProductDao;
import com.app.dto.AddProductDto;
import com.app.dto.RespProductDto;
import com.app.entities.Category;
import com.app.entities.Product;
import com.app.exception.CustomException;
import com.app.exception.ResourceNotFoundException;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private CategoryDao categoryDao;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public Product addNewProduct(Product product) {
		return productDao.save(product);
	}

	@Override
	public List<Product> getAllProducts() {
		return productDao.findAll();
	}

	@Override
	public Product findProductById(Long prodId) {
		Product product = productDao.findById(prodId).orElseThrow(() -> new CustomException());
		return product;
	}

//	@Override
//	public List<Product> getProductsByCategory(Category type) {
//		return productDao.getProductsByProdCategory(type);
//	}

	@Override
	public Product updateProductDetails(Product product) {
		if (productDao.existsById(product.getId())) {
			return productDao.save(product);
		}
		throw new ResourceNotFoundException("Invalid product");
	}

	@Override
	public String deleteProductDetails(Long prodId) {
		if (productDao.existsById(prodId)) {
			productDao.deleteById(prodId);
			return "Product details deleted successfully..!";
		}
		return "Product details can't be deleted";
	}
	
	@Override
	public RespProductDto addProductInCategory(AddProductDto addDto)
	{
       Category category=categoryDao.findById(addDto.getCategoryId()).orElseThrow(()-> new ResourceNotFoundException("Invalid id!!"));
       Product product = mapper.map(addDto, Product.class);
       product.setCategory(category);
      return mapper.map(productDao.save(product), RespProductDto.class);
		
	}	
}

