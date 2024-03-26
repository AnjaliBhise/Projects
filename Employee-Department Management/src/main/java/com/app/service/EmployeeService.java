package com.app.service;

import java.util.List;

import com.app.dto.AddEmpDTO;
import com.app.dto.EmpRespDTO;
import com.app.entities.Employee;

public interface EmployeeService {
	List<Employee> getAllEmps();

	EmpRespDTO addEmpDetails(AddEmpDTO dto);

	Employee getEmpDetails(Long empId);

	String deleteEmpDetails(Long empId);

}
