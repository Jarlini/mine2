
import React from 'react';
import { Link } from 'react-router-dom';
import '/home/uki-student/Downloads/mine/freshmyf-main/src/component/Navbar.css'; // Adjust path based on your project structure
import logo from '/home/uki-student/Downloads/mine/freshmyf-main/src/component/photos/Screenshot from 2024-08-23 14-49-14.png'; // Adjust path based on your project structure

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="nav-links">
      <Link to="/" className="nav-button">LandingPage</Link>
        <Link to="/home" className="nav-button">Home</Link>
        <Link to="/auth/signin" className="nav-button"> Sign In</Link>
        <Link to="/auth/signup" className="nav-button">Sign Up </Link>
        <Link to="/packege" className="nav-button">packege </Link>
      
      </div>
    </nav>
  );
}

export default Navbar;
