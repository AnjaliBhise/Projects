import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import registerimg from '../assets/login_reg.jpg';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const message = await response.text();

        toast.success(message || "Registration successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true, 
        });

        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else {
        const errorMessage = await response.text();
        toast.error("Error: " + errorMessage, {
          position: "top-right",
          autoClose: 4000, 
        });
      }
    } catch (error) {
      toast.error("Failed to connect to server", {
        position: "top-right",
        autoClose: 4000,
        style: { backgroundColor: "#ffe6e6", color: "#990000" },
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <ToastContainer />
      <img
        src={registerimg}
        alt="Register Background"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "fill",
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
          left: "10%",
          transform: "translateY(-50%)",
        }}
      >
        <h3
          className="text-center mb-3"
          style={{ fontFamily: "'Merienda', cursive" }}
        >
          Register
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#6b4f4f" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
