package com.bookstore.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.bookstore.entities.Book;
import com.bookstore.entities.User;
import com.bookstore.repositories.BookRepository;
import com.bookstore.repositories.UserRepository;

@Service
public class BookServiceImpl implements BookService{
	
	@Autowired
	private BookRepository bookrepository;
	
	@Autowired
	private UserRepository userrepository;
	
	private static final String GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

    private final RestTemplate restTemplate = new RestTemplate();
		
	@Override
	public List<Book> findAll() {
		return bookrepository.findAll();
		
	}
	@Override
	public Optional<Book> findById(Long id) {
		return bookrepository.findById(id);
	}

	@Override
	public Book save(Book book) {
		return bookrepository.save(book);
	}

	public Book update(Long id, Book updatedBook) {
	    Optional<Book> optionalBook = bookrepository.findById(id); 

	    if (!optionalBook.isPresent()) {
	        throw new RuntimeException("Book not found");
	    }
	    Book book = optionalBook.get(); 

	    book.setTitle(updatedBook.getTitle());
	    book.setAuthor(updatedBook.getAuthor());
	    book.setCategory(updatedBook.getCategory());
	    book.setPrice(updatedBook.getPrice());
	    book.setStock(updatedBook.getStock());
	    book.setImageUrl(updatedBook.getImageUrl());
	    // book.setIsbn() is intentionally NOT updated

	    return bookrepository.save(book);
	}

	@Override
	public void delete(Long id) {
		bookrepository.deleteById(id);
	}
			
	 @Override
	    public List<Book> searchByTitle(String title) {
	        return bookrepository.findByTitleContainingIgnoreCase(title);
	    }

	    @Override
	    public List<Book> searchByAuthor(String author) {
	        return bookrepository.findByAuthorContainingIgnoreCase(author);
	    }

	    public List<String> getAllCategories() {
	        return bookrepository.findDistinctCategories();
	    }
	    
	    @Override
	    public List<Book> searchByCategory(String category) {
	        return bookrepository.findByCategoryContainingIgnoreCase(category);
	    }
	    
	    public List<Book> fetchAndSaveGoogleBooks() {
	        List<String> categories = List.of("Fiction", "Science", "History", "Technology", "Romance", "Mystery");
	        List<Book> allBooks = new ArrayList<>();

	        for (String category : categories) {
	            String url = GOOGLE_BOOKS_API_URL + category + "&maxResults=30";
	            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

	            if (response != null && response.containsKey("items")) {
	                List<Map<String, Object>> items = (List<Map<String, Object>>) response.get("items");
	                List<Book> categoryBooks = new ArrayList<>();

	                for (Map<String, Object> item : items) {
	                    Map<String, Object> volumeInfo = (Map<String, Object>) item.get("volumeInfo");

	                    String title = (String) volumeInfo.getOrDefault("title", "Unknown Title");
	                    List<String> authors = (List<String>) volumeInfo.getOrDefault("authors", List.of("Unknown Author"));
	                    List<String> bookCategories = (List<String>) volumeInfo.getOrDefault("categories", List.of(category));

	                    String isbn = null;
	                    if (volumeInfo.containsKey("industryIdentifiers")) {
	                        List<Map<String, Object>> identifiers = (List<Map<String, Object>>) volumeInfo.get("industryIdentifiers");
	                        if (identifiers != null && !identifiers.isEmpty()) {
	                            isbn = (String) identifiers.get(0).getOrDefault("identifier", null);
	                        }
	                    }

	                    String imageUrl = null;
	                    if (volumeInfo.containsKey("imageLinks")) {
	                        Map<String, Object> imageLinks = (Map<String, Object>) volumeInfo.get("imageLinks");
	                        imageUrl = (String) imageLinks.getOrDefault("thumbnail", null);
	                    }

	                    Book book = new Book();
	                    book.setTitle(title);
	                    book.setAuthor(authors.get(0));
	                    book.setCategory(bookCategories.get(0));
	                    book.setPrice(Math.round((Math.random() * 100) * 100.0) / 100.0); // rounded to 2 decimals
	                    book.setStock((int) (Math.random() * 20));
	                    book.setIsbn(isbn);
	                    book.setImageUrl(imageUrl);

	                    categoryBooks.add(book);
	                }

	                bookrepository.saveAll(categoryBooks);
	                allBooks.addAll(categoryBooks);
	            }
	        }
	        return allBooks;
	    }
}
