import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDashboardHeader from "../components/UserDashboardHeader";
import userDashboardBg from "../assets/booklist4.jpg";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  const fetchBooks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/books/categorywisebooks?category=${encodeURIComponent(category)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error(`Failed to fetch books: ${response.status}`);
      const data = await response.json();
      setBooks(data);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const searchBooks = async (term) => {
    setSearchTerm(term);

    if (!term.trim()) {
      fetchBooks();
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/books/search?title=${encodeURIComponent(term)}&category=${encodeURIComponent(category)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error(`Failed to search books: ${response.status}`);
      const data = await response.json();
      setBooks(data);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const buyBook = async (book) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to purchase.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/orders/place", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookTitle: book.title,
          price: book.price,
        }),
      });

      if (!response.ok) throw new Error("Failed to place order");
      toast.success(`Book "${book.title}" purchased successfully!`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [category]);

  return (
    <div
      className="user-dashboard"
      style={{
        minHeight: "100vh",
        background: `url(${userDashboardBg}) no-repeat center center fixed`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        padding: "0 60px",
      }}
    >
            <div className="header-wrapper" style={{paddingTop:"20px"}}>
              <UserDashboardHeader />
            </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => searchBooks(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "20px",
            border: "none",
            outline: "none",
            width: "500px",
          }}
        />
      </div>

      <h2
        style={{
          textAlign: "center",
          fontSize: "32px",
          margin: "20px 0",
          color: "black",
          fontFamily: "'Merienda', cursive", 
        }}
      >
        Books in {category}
      </h2>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div
        className="books-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          padding: "0 60px",
          marginBottom: "40px",
        }}
      >
        {books.length > 0 ? (
          books.map((book) => (
            <div
              className="book-card"
              key={book.id}
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                borderRadius: "16px",
                padding: "18px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                color: "#4b0035",
                transition: "all 0.3s ease",
              }}
            >
              <div>
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginBottom: "12px",
                  }}
                />
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Category:</strong> {book.category}</p>
                <p><strong>Price:</strong> ₹{book.price}</p>
                <p><strong>Stock:</strong> {book.stock}</p>
                <p><strong>ISBN:</strong> {book.isbn}</p>
              </div>
              <button
                onClick={() => buyBook(book)}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#4b0035",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  alignSelf: "center",
                }}
              >
                Buy Book
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>Loading books...</p>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default BookList;
