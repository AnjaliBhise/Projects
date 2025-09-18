import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaBookMedical, FaClipboardList } from "react-icons/fa";
import "./UserDashboardHeader.css";
import logo from "../assets/logo.jpg";

const UserDashboardHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="user-dashboard-header">
      <div className="header-left">
        <img src={logo} alt="PaperLeaf Logo" className="logo" />
        <h4 className="header-text">PaperLeaf</h4>
      </div>

      <div className="header-right" ref={dropdownRef}>
        <div
          className="profile-section"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <FaUserCircle className="profile-icon" size={28} />
          <span className="account-text">My Account</span>
        </div>

        {dropdownOpen && (
          <div className="dropdown-menu show">
            <a href="/manage-orders" className="dropdown-item">
              <FaClipboardList className="dropdown-icon" /> Manage Orders
            </a>
            <a href="/addbook" className="dropdown-item">
              <FaBookMedical className="dropdown-icon" /> Add Book
            </a>
          </div>
        )}
      </div>

      <style>{`
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dropdown-icon {
          font-size: 1rem;
        }
      `}</style>
    </header>
  );
};

export default UserDashboardHeader;
