import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImg from "../assets/login_reg.jpg"; 

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category"); 

  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    stock: "",
    isbn: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    fetch(`http://localhost:8080/api/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch book details");
        return res.json();
      })
      .then((data) => setBook(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:8080/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          category: book.category,
          price: parseFloat(book.price),
          stock: parseInt(book.stock),
          imageUrl: book.imageUrl,
        }),
      });

      if (!res.ok) throw new Error("Failed to update book");

      toast.success("Book updated successfully!");
      setTimeout(() => navigate(`/admin-booklist?category=${encodeURIComponent(category)}`), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <img
        src={backgroundImg}
        alt="Background"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      <div
        className="card p-4 shadow-lg"
        style={{
          width: "500px",
          borderRadius: "15px",
          position: "absolute",
          top: "50%",
          left: "25%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h3
          className="text-center mb-3"
          style={{ fontFamily: "'Merienda', cursive" }}
        >
          Edit Book
        </h3>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-control"
              name="author"
              value={book.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={book.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={book.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={book.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ISBN (Read Only)</label>
            <input
              type="text"
              className="form-control"
              name="isbn"
              value={book.isbn}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              name="imageUrl"
              value={book.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            disabled={loading}
            style={{
              backgroundColor: "#6b4f4f",
              color: "#fff",
              fontFamily: "'Merienda', cursive",
            }}
          >
            {loading ? "Updating Book..." : "Update Book"}
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
};

export default EditBook;
