package com.app.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.apache.catalina.mapper.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.UserDao;
import com.app.dtos.Credential;
import com.app.dtos.DtoEntityConverter;
import com.app.dtos.ResetPasswordDto;
import com.app.dtos.UserDto;
import com.app.entities.User;

@Transactional
@Service
public class UserService {

	@Autowired
	private UserDao userDao;
	@Autowired
	private DtoEntityConverter converter;
	@Autowired
	private PasswordEncoder passwordencoder;
	@Autowired
	private DtoEntityConverter Converter;
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private OtpService otpService;
	
	
	public UserDto findUserById(int userId) {
		User user = userDao.findByUserId(userId);
		return converter.toUserDto(user);
	}

	public UserDto findUserByEmail(String email) {
		User user = userDao.findByEmail(email);
		return converter.toUserDto(user);
	}

	public UserDto findUserByEmailAndPassword(Credential cred) {
		User user = userDao.findByEmail(cred.getEmail());
		String rawpassword = cred.getPassword();
		System.out.println(cred);
		if (user != null && passwordencoder.matches(rawpassword, user.getPassword())) {
			return converter.toUserDto(user);
		}
		return null;
	}
	
	public ResetPasswordDto ResetPassword(ResetPasswordDto resetPasswordDto) {
		User entityUser = userDao.findByEmail(resetPasswordDto.getEmail());
		entityUser.setPassword(passwordencoder.encode(resetPasswordDto.getNewPassword()));
		return mapper.map(userDao.save(entityUser),ResetPasswordDto.class);
	}

	public User AddUser(UserDto userdto) {
		String rawpassword = userdto.getPassword();
		System.out.println(rawpassword);
		String encrpassword = passwordencoder.encode(rawpassword);
		userdto.setPassword(encrpassword);
		User newUser = userDao.save(Converter.UserDtotoUser(userdto));
		return newUser;
	}

//	public List<UserDto> DeliveryBoysList() {
//		List<User> list = userDao.findAll();
//		List<UserDto> dlist = new ArrayList<UserDto>();
//		for (User u : list) 
//		{
//			if (u.getRole().equals("ROLE_DELIVERYBOY"))
//				dlist.add(Converter.toUserDto(u));
//		}
//		return dlist;
//	}

	public List<UserDto> deliveryBoysList() {
	    List<User> userList = userDao.findAll();
	    
	    if (userList == null) {
	        // Handle the case where userDao.findAll() returns null
	        return Collections.emptyList(); // or throw an exception, depending on your requirements
	    }

	    List<UserDto> deliveryBoysList = new ArrayList<>();

	    for (User user : userList) {
	        String role = user.getRole();
	        if ("ROLE_DELIVERYBOY".equals(role)) {
	            deliveryBoysList.add(Converter.toUserDto(user));
	        }
	    }

	    return deliveryBoysList;
	}

	public User DeleteUser(int userId) {
		User u = userDao.findByUserId(userId);
		System.out.println(u);
		userDao.delete(u);
		return u;
	}

//	public List<UserDto> getAllCustomers() {
//		List<User> users = userDao.findAll();
//		List<UserDto> userlist = new ArrayList<UserDto>();
//		for (User u : users) {
//			if (u.getRole().equals("ROLE_USER")) {
//				userlist.add(Converter.toUserDto(u));
//			}
//		}
//		return userlist;
//	}
	public List<UserDto> getAllCustomers() {
	    List<User> users = userDao.findAll();

	    if (users == null) {
	        // Handle the case where userDao.findAll() returns null
	        return Collections.emptyList(); // or throw an exception, depending on your requirements
	    }

	    List<UserDto> userlist = new ArrayList<>();

	    for (User u : users) {
	        if ("ROLE_USER".equals(u.getRole())) {
	            userlist.add(Converter.toUserDto(u));
	        }
	    }

	    return userlist;
	}


	public Map<String, Object> editUser(int userId, UserDto dto) {
		User user = userDao.findByUserId(userId);
		user.setUserName(dto.getUserName());
		user.setEmail(dto.getEmail());
		user.setPhone(dto.getPhone());
		user.setRole(dto.getRole());
		user.setAadharNo(dto.getAadharNo());
		user = userDao.save(user);
		return Collections.singletonMap("userChanged", 1);
	}

	public List<String> getUserRoles() {
		List<String> list = userDao.findDistinctRole();
		return list;
	}
//	public String generateAndSendOTP(String email) 
//	{
//        User user = userDao.findByEmail(email);
//        if (user != null) 
//        {
//            String otp = otpService.generateAndSendOTP(email);
//            return otp;
//        } 
//        else
//        {
//            throw new RuntimeException("User not found");
//        }
//    }
//	
	public String generateAndSendOTP(String email) {
	    User user = userDao.findByEmail(email);
	    if (user != null) {
	        String otp = otpService.generateAndSendOTP(email);
	        return otp;
	    } else {
	        throw new RuntimeException("User not found");
	    }
	}

	
}
