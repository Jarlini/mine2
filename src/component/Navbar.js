import React from 'react';
import { Link } from 'react-router-dom';
import '/home/uki-student/mine/freshmyf-main/src/component/Nav.css';// Adjust path based on your project structure

import logo from '/home/uki-student/mine/freshmyf-main/src/component/photos/Screenshot from 2024-08-23 14-49-14.png'; // Adjust path based on your project structure
import { FaHome, FaBoxOpen, FaUserPlus, FaInfoCircle } from 'react-icons/fa'; // Import icons

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-button">
          <FaHome /> Home
        </Link>
      
      

        <Link to="/about" className="nav-button"> {/* New About Us link */}
          <FaInfoCircle /> About Us
        </Link>
        <Link to="/packages" className="nav-button">
          <FaBoxOpen /> Package
        </Link>
        <Link to="/auth/signin" className="nav-button">
          <FaUserPlus /> Join
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
