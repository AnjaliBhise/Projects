import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./EntryHeader.css";
import logo from "../assets/logo.jpg";

const EntryHeader = () => {
  return (
<div>
<nav className="d-flex justify-content-between align-items-center px-5 py-3" style={{ backgroundColor: "transparent"}} >
  <div className="d-flex align-items-center" style={{padding: "20px 35px"}}>
    <img
      src={logo}
      alt="PaperLeaf Logo"
      style={{ height: "30px", marginRight: "10px", borderRadius: "8px" }}
    />
    <h4 className="mb-0 fw-normal fs-5 text-black" style={{ fontFamily: "'Marenda', cursive"}}> PaperLeaf </h4>
  </div>

  <ul className="nav transparent-nav" style={{padding: "20px 35px"}}>
    <li className="nav-item">
  <a className="nav-link text-black fs-6 fw-normal" href="/login">
    Login
  </a>
</li>

    <li className="nav-item">
      <a className="nav-link text-black fs-6 fw-normal" href="/register">
        Register
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link text-black fs-6 fw-normal" href="/aboutus">
        About
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link text-black fs-6 fw-normal" href="/contactus">
        Contact
      </a>
    </li>
  </ul>
</nav>
    </div>
  );
};

export default EntryHeader;
