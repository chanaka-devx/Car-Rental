import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@rentride.lk</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms&conditions">Terms and Conditions</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook/></Link>
            <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter/></Link>
            <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram/></Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
      <p>
            copyright © 2025 <Link to="https://RentRide.lk" >RentRide  </Link> 
            | developing by <Link to="https://www.facebook.com/chanaka.malawige/" target="_blank" >  Chanaka Malawige</Link>
            </p>
      </div>
    </footer>
  );
};

export default Footer;
