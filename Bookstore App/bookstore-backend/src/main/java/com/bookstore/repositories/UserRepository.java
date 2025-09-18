package com.bookstore.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.entities.User;

public interface UserRepository extends JpaRepository<User, Long>
{
	Optional<User> findByEmail(String email);
	 boolean existsByEmail(String email);
}
