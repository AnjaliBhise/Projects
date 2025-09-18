package com.bookstore.services;

import com.bookstore.entities.Book;

import java.util.*;

public interface BookService {

	List<Book> findAll();
	Optional<Book> findById(Long id);
	Book save(Book book);
	Book update(Long id, Book book);
	void delete(Long id);
	List<Book> searchByTitle(String title);
    List<Book> searchByAuthor(String author);
    List<Book> searchByCategory(String category);
    List<String> getAllCategories();
    List<Book> fetchAndSaveGoogleBooks();
}
