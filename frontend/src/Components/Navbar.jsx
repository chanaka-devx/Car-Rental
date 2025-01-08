import React, { useState } from 'react';
import RentRide from '../../src/Images/logo3.png';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src={RentRide} alt="Logo" className="logo-image" />
        </div>

        <ul className="menu">
          <li>
            <a href="#list-your-vehicle" className="menu-item">
              List Your Vehicle
            </a>
          </li>
          <li>
            <Link to="signup" className="menu-item">
              Sign Up
            </Link>
          </li>
          <li>
            <a href="#blog" className="menu-item">
              Blog
            </a>
          </li>
          <li>
            <a href="#faq" className="menu-item">
              FAQ
            </a>
          </li>
        </ul>

        <div className="login-btn-container">
          <Link to="Login" className="login-btn">
            Login
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu-toggle">
          <button onClick={toggleMobileMenu} className="toggle-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="toggle-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}
      >
        <ul className="mobile-menu-list">
          <li>
            <a href="#list-your-vehicle" className="mobile-menu-item">
              List Your Vehicle
            </a>
          </li>
          <li>
            <Link to="signup" className="mobile-menu-item">
              Sign Up
            </Link>
          </li>
          <li>
            <a href="#blog" className="mobile-menu-item">
              Blog
            </a>
          </li>
          <li>
            <a href="#faq" className="mobile-menu-item">
              FAQ
            </a>
          </li>
          <li>
            <Link to="Login" className="mobile-login-btn">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
