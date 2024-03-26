package com.app.dto;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.Future;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.app.entities.EmploymentType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AddEmpDTO {
	@NotNull(message ="Dept Id required!!!!")
	private Long deptId;
	@NotBlank(message = "first name must be supplied!!!")
	private String firstName;	
	private String lastName;	
	@NotBlank(message = "email required....")
	@Email(message = "Invalid email format!!")
	private String email;	
	@Pattern(regexp="((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})",message = "Invalid password")
	private String password;
	@NotNull
	@Future
	private LocalDate joinDate;	
	@NotNull
	private EmploymentType empType;
	@Min(value = 50000,message = "sal must be > 50000")
	private double salary;
}
