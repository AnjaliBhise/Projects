package com.app.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserDto {

	private int userId;
	private String userName;
	private String email;
	private String password;
	private String phone;
	private String role;
	private String aadharNo;
	
}
