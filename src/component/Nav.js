import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Nav.css'; // Import your CSS
import logo from '/home/uki-student/mine/freshmyf-main/src/component/photos/Screenshot from 2024-08-23 14-49-14.png';
import { FaHome, FaBoxOpen, FaUserPlus, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/'); // Redirect to home page after logout
  };

  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
    <nav
      className="navbar fixed-top d-flex justify-content-between align-items-center px-3 shadow"
      style={{
        backgroundColor: '#008080',
        color: 'black',
        zIndex: 1000,
        width: '100%',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="logo">
        <img
          src={logo}
          alt="Logo"
          style={{
            width: '80px',
            height: '70px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="d-flex">
        <Link to="/" className="nav-butto0n mx-2">
          <FaHome /> Home
        </Link>
        <Link to="/about" className="nav-butto0n mx-2">
          <FaInfoCircle /> About Us
        </Link>
        <Link to="/packages" className="nav-butto0n mx-2">
          <FaBoxOpen /> Package
        </Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="nav-button mx-2">
            <FaSignOutAlt /> Logout
          </button>
        ) : (
          <Link to="/auth/signin" className="nav-button mx-2">
            <FaUserPlus /> Join
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
