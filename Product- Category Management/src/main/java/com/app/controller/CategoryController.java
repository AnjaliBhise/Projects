package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CategoryDto;
import com.app.service.CategoryService;



@RestController
@RequestMapping("/categories")
public class CategoryController 
{
	@Autowired
	private CategoryService catService;

	public CategoryController() {
		System.out.println("in ctor of "+getClass());
	}
	
	@PostMapping
	public CategoryDto addNewCategory(@RequestBody CategoryDto Dto )
	{
		System.out.println("in add new category"+Dto);
		return catService.addNewCategory(Dto);
	}
	
	

}
