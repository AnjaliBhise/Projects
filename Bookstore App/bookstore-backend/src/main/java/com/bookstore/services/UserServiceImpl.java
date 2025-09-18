package com.bookstore.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bookstore.entities.User;
import com.bookstore.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userrepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public List<User> findAllUsers() {
		return userrepository.findAll();
	}

	@Override
	public Optional<User> getUserByEmail(String email) {
		return userrepository.findByEmail(email);
	}
	
	@Override
	public Optional<User> getUserById(Long id) {
		return userrepository.findById(id);
	}

	@Override
	public User updateUser(User updated) {
	    User existingUser = userrepository.findByEmail(updated.getEmail())
	            .orElseThrow(() -> new RuntimeException("User not found with email: " + updated.getEmail()));

	    existingUser.setName(updated.getName());
	    existingUser.setAddress(updated.getAddress());

	   
	    if (updated.getPassword() != null && !updated.getPassword().isEmpty()) {
	    	existingUser.setPassword(passwordEncoder.encode(updated.getPassword()));
	    }

	    return userrepository.save(existingUser);
	}
	
	@Override
	public void deleteUserById(Long id) {
		userrepository.deleteById(id);
		
	}
}