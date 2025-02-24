import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import "./Footer.css";

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
            <li><a href="/about">About Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms&conditions">Terms and Conditions</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook/></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter/></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram/></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
      <p>
            copyright © 2025 <a href="https://RentRide.lk" >RentRide  </a> 
            | developing by <a href="https://www.facebook.com/chanaka.malawige/" >  Chanaka Malawige</a>
            </p>
      </div>
    </footer>
  );
};

export default Footer;
