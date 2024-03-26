package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Category;
import com.app.entities.Product;

public interface CategoryDao extends JpaRepository<Category, Long>
{
	
}
