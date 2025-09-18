package com.bookstore.services;

import java.util.List;
import java.util.Optional;

import com.bookstore.entities.User;

public interface UserService {
	
	List<User> findAllUsers();
	Optional<User> getUserById(Long id);
	Optional<User> getUserByEmail(String email);
	User updateUser(User updated);
	void deleteUserById(Long id);
}
