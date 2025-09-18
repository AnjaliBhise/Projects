package com.bookstore.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.entities.Book;
import com.bookstore.entities.User;
import com.bookstore.services.BookService;
import com.bookstore.services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired 
	private UserService userservice;
	
	@Autowired 
	private BookService bookservice;
	
	@GetMapping
	List<User> findAllUsers()
	{
		return userservice.findAllUsers();
	}
	
	@GetMapping("/id/{id}")
	public Optional<User> getUserById(@PathVariable Long id) {
	    return userservice.getUserById(id);
	}

	@GetMapping("/email/{email}")
	public Optional<User> getUserByEmail(@PathVariable String email) {
	    return userservice.getUserByEmail(email);
	}

		
	@PutMapping("/update")
	@PreAuthorize("hasRole('USER')")
	User updateUser(@RequestBody User updated)
	{
		return userservice.updateUser(updated);
	}
	
	@DeleteMapping("/{id}")
	String deleteUser(@PathVariable Long id)
	{
		userservice.deleteUserById(id);
		return "User deleted sucessfully";
	}
}
