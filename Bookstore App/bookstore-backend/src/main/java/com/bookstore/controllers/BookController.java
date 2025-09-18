package com.bookstore.controllers;

import java.util.Collections;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.entities.Book;
import com.bookstore.services.BookService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {
	@Autowired
	private BookService bookservice;
	
	@GetMapping
	List<Book> findAll()
	{
		return bookservice.findAll();
	}
	
	@GetMapping("/{id}")
	Optional<Book> findById(@PathVariable Long id)
	{
		return bookservice.findById(id);
	}
	
	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	Book save(@RequestBody Book book)
	{
		return bookservice.save(book);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	Book update(@PathVariable Long id, @RequestBody Book book)
	{
		return bookservice.update(id, book);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
    String delete(@PathVariable Long id)
	{
		bookservice.delete(id);
		return "Book deleted sucessfully";
	}
	
	@GetMapping("/search")
	@PreAuthorize("hasAnyRole('USER','ADMIN')")
	public ResponseEntity<List<Book>> searchBooks(@RequestParam(required = false) String title, @RequestParam(required = false) String author, @RequestParam(required = false) String category) {
	    if (title != null) {
	        return ResponseEntity.ok(bookservice.searchByTitle(title));
	    } else if (author != null) {
	        return ResponseEntity.ok(bookservice.searchByAuthor(author));
	    } else if (category != null) {
	        return ResponseEntity.ok(bookservice.searchByCategory(category));
	    } else {
	        return ResponseEntity.badRequest().build();
	    }
	}
	
	@GetMapping("/categories")
	@PreAuthorize("hasAnyRole('USER','ADMIN')")
	public ResponseEntity<List<String>> getAllCategories() {
	    List<String> categories = bookservice.getAllCategories();
	    return ResponseEntity.ok(categories);
	}
	
	@GetMapping("/categorywisebooks")
	@PreAuthorize("hasAnyRole('USER','ADMIN')")
	public ResponseEntity<List<Book>> getbBooksByCategory(String category) 
	{
	    List<Book> books = bookservice.searchByCategory(category);
	    return ResponseEntity.ok(books);
	}
	
	@GetMapping("/import/googlebooks")
	@PreAuthorize("hasRole('ADMIN')")
	public List<Book> importBooksFromGoogle() {
	    return bookservice.fetchAndSaveGoogleBooks();
	}
}
