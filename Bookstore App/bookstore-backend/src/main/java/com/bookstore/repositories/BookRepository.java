package com.bookstore.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bookstore.entities.Book;

public interface BookRepository extends JpaRepository<Book,Long>
{
	List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByAuthorContainingIgnoreCase(String author);
    List<Book> findByCategoryContainingIgnoreCase(String category);
    @Query("SELECT DISTINCT b.category FROM Book b")
    List<String> findDistinctCategories();
}
