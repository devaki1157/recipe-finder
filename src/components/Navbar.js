import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Recipe Finder</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/recipes">Recipes</Link></li>
      </ul>
      <div className="profile-btn"><Link to="/login">Profile</Link></div>
    </nav>
  );
};

export default Navbar;
