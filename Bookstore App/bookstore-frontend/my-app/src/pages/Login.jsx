import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import loginimg from '../assets/login_reg.jpg';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Login failed");
      }

      const data = await response.json();
      const token = data.token;

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const userRole = decoded?.role?.[0]?.authority;

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined, 
      });

      setTimeout(() => {
        if (userRole === "ROLE_ADMIN") {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/user-dashboard";
        }
      }, 1000);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <img
        src={loginimg}
        alt="Login Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
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
        <h3 className="text-center mb-3" style={{ fontFamily: "'Merienda', cursive" }}>
          Login
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "#6b4f4f", color: "#fff", fontFamily: "'Merienda', cursive" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
          Don't have an account? <a href="/register" style={{ color: "#6b4f4f" }}>Register</a>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
