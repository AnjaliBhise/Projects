import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboardHeader from "../components/AdminDashboardHeader";
import userDashboardBg from "../assets/booklist.jpg";

const AdminBooklist = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
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
    } catch (err) {
      setError(err.message);
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
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [category]);

  const handleEdit = (book) => {
    navigate(`/editbook/${book.id}?category=${encodeURIComponent(category)}`);
  };

  const handleDelete = async (bookId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to delete.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete book");

      toast.success("Book deleted successfully!");
      fetchBooks();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div
      className="user-dashboard"
      style={{
        minHeight: "100vh",
        background: `url(${userDashboardBg}) no-repeat center center fixed`,
        backgroundSize: "cover",
        color: "#fff",
        padding: "0 60px",
      }}
    >
      <div className="header-wrapper" style={{paddingTop:"20px"}}>
              <AdminDashboardHeader />
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

              <div
                style={{
                  marginTop: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <button
                  onClick={() => handleEdit(book)}
                  style={{
                    backgroundColor: "#4b0035",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 14px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  style={{
                    backgroundColor: "#c0392b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 14px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>Loading books...</p>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminBooklist;
