package com.app.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.CategoryDao;
import com.app.dto.CategoryDto;
import com.app.entities.Category;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService
{
	@Autowired
	private CategoryDao catdao;
	
	@Autowired
	private ModelMapper mapper;
	

	@Override
	public CategoryDto addNewCategory(CategoryDto cat) 
	{
		Category categoryEntity = catdao.save((mapper.map(cat, Category.class)));
		return mapper.map(categoryEntity,CategoryDto.class);
	}

}
