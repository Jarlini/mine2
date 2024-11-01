import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function SocialBar() {
  return (
    <div className="social-bar d-flex justify-content-between align-items-center px-4">
      {/* Left Side: Follow Us with Social Icons */}
      <div className="d-flex align-items-center">
        <span className="follow-us-text me-3">Follow Us:</span>
        <a href="https://facebook.com" className="social-icon mx-2" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" className="social-icon mx-2" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" className="social-icon mx-2" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" className="social-icon mx-2" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a> <p><b/> +234 456 456</p>
      </div>
      
      {/* Right Side: Language Selector */}
      <div className="language-selector">
        <label htmlFor="language-select" className="me-2">Language:</label>
        <select id="language-select" className="form-select form-select-sm">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>
    </div>
  );
}

export default SocialBar;
