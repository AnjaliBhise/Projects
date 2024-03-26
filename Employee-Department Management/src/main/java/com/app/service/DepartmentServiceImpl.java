package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.DepartmentDao;
import com.app.dto.DepartmentDTO;
import com.app.entities.Department;

@Service
@Transactional
public class DepartmentServiceImpl implements DepartmentService {
	// dep
	@Autowired
	private DepartmentDao deptDao;
	// dep :
	@Autowired
	private ModelMapper mapper;

	@Override
	public DepartmentDTO addNewDepartment(DepartmentDTO dept) {
		// dept dao is saving dept entity (for conversion dto--> entity : using Mapper)
		Department deptEntity = deptDao.save(mapper.map(dept, Department.class));
		//ent --> dto
		return mapper.map(deptEntity, DepartmentDTO.class);
	}

	@Override
	public List<DepartmentDTO> getAllDepartments() {
		// TODO Auto-generated method stub
		return deptDao.findAll() // List<Dept>
				.stream() // Stream<Dept>
				.map(dept -> mapper.map(dept, DepartmentDTO.class)) // Stream<DTO>
				.collect(Collectors.toList());// List<DTO>
	}

}
