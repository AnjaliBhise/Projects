import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import registerimg from "../assets/login_reg.jpg";

const AddBook = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    stock: "",
    isbn: "",
    imageUrl: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock, 10),
        }),
      });

      if (response.ok) {
        toast.success("Book added successfully!");
        setTimeout(() => navigate(`/admin-booklist?category=${encodeURIComponent(formData.category)}`), 1500);
      } else {
        const errorMessage = await response.text();
        toast.error("Error: " + errorMessage);
      }
    } catch (error) {
      toast.error("Failed to connect to server");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <img src={registerimg} alt="Background" style={{ position: "absolute", width: "100%", height: "100%", objectFit: "fill", zIndex: -1,}} />
      <div className="card p-4 shadow-lg" style={{ width: "500px", height: "750px", borderRadius: "15px", position: "absolute", top: "50%", left: "10%", transform: "translateY(-50%)",}} >
        <h3 className="text-center mb-3" style={{ fontFamily: "'Merienda', cursive" }} > Add New Book </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input type="text" 
              className="form-control"
              name="title"
              value={formData.title}
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
              value={formData.author}
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
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="price"
              value={formData.price}
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
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">ISBN</label>
            <input
              type="text"
              className="form-control"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              name="imageUrl"
              value={formData.imageUrl}
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
            {loading ? "Adding Book..." : "Add Book"}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AddBook;
