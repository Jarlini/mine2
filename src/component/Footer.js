import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import social media icons and email icon
import '/home/uki-student/mine/freshmyf-main/src/component/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                <a href="mailto:jalujalu998@example.com" target="_blank" rel="noopener noreferrer"><FaEnvelope /></a>
            </div>
            <div className="copyright">
                © {new Date().getFullYear()} Vayago. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
