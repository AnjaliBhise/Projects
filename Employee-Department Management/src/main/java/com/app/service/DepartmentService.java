package com.app.service;

import java.util.List;

import com.app.dto.DepartmentDTO;

public interface DepartmentService {

	DepartmentDTO addNewDepartment(DepartmentDTO dept);

	List<DepartmentDTO> getAllDepartments();

}
