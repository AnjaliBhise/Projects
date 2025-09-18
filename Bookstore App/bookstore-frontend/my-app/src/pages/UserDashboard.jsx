import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDashboardHeader from "../components/UserDashboardHeader";
import userDashboardBg from "../assets/user_dashboard.jpg";

const UserDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    fetch("http://localhost:8080/api/books/categories", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => setError(error.message));
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/booklist?category=${encodeURIComponent(category)}`);
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
        <UserDashboardHeader />
      </div>
      
      <div className="hero-wrapper">
        <section className="hero-section" style={{ fontFamily: "'Merienda', cursive" }}>
          <h2 style={{ color: "black", textAlign: "center", marginTop: "30px" }}>
            Book Categories
          </h2>

          {error && <p className="error-message">{error}</p>}

          <div className="categories-container">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <div
                  className="category-card"
                  key={index}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </div>
              ))
            ) : !error ? (
              <p style={{ textAlign: "center", opacity: 0.7 }}>Loading categories...</p>
            ) : null}
          </div>
        </section>
      </div>

      <style>{`
        .categories-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
          margin-top: 20px;
          padding : 0 60px;
        }

        .category-card {
          background: rgba(255, 255, 255, 0.28);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 16px;
          padding: 18px;
          text-align: center;
          backdrop-filter: blur(8px) saturate(150%);
          -webkit-backdrop-filter: blur(8px) saturate(150%);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
          font-size: 1rem;
          font-weight: 600;
          color: #2c2c2c;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .category-card:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .error-message {
          color: #ff6b6b;
          text-align: center;
          font-weight: bold;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;
