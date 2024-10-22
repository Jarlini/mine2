import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Adjusted path for CSS import
import logo from './photos/Screenshot from 2024-08-23 14-49-14.png'; // Adjusted path for logo import

function Navbar({ cart }) { // Receive cart as a prop
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-button">Landing Page</Link>
        <Link to="/auth/signin" className="nav-button">Join</Link>
        <Link to="/packages" className="nav-button">Packages</Link>
        <Link to="/payment" className="nav-button">Payment</Link> {/* Show cart length */}
        <Link to="/chat" className="nav-button">Chat</Link>
      </div>
    </nav>
  );
}

export default Navbar;
