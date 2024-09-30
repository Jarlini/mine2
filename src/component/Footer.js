import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import social media icons
import'/home/uki-student/Downloads/mine/freshmyf-main/src/component/Footer.css';
function Footer() {
    return (
        <footer className="footer">
            <p>Contact Us: <a href="mailto:jalujalu998@example.com">jalujalu998@example.com</a> | Phone: <a href="tel:+94757115381">0757115381</a></p>
            <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
        </footer>
    );
}

export default Footer;
