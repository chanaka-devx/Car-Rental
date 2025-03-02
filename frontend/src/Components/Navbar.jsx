import React, { useState } from 'react';
import RentRide from '../../src/Images/logo3.png';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userId } = useParams();
  const [user, setUser] = useState({
      Name: "",
      Email: "",
      Mobile: "",
    });

  // Check token in localStorage
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path

  // Handler to remove token and redirect
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // or use React Router's navigate
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <a href='/'><img src={RentRide} alt="Logo" className="logo-image" /></a>
        </div>

        <ul className="menu">
          <li>
            <a
              href="/"
              className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </a>
          </li>
          <li>
            {token ? (
            <button
              className={`menu-item ${location.pathname === '/profile' ? 'active' : ''}`}
              onClick={() => navigate(`/profile`)}
              
            >
              Profile
            </button>
            
            ) : (
              <button
                className={`menu-item ${location.pathname === '/register' ? 'active' : ''}`}
                onClick={() => navigate("/register")}
              >
                SignUp
              </button>
            )}
          </li>
          <li>
            <a
              href="#blog"
              className={`menu-item ${location.hash === '#blog' ? 'active' : ''}`}
            >
              Blog
            </a>
          </li>
          <li>
            <a
              href="/faq"
              className={`menu-item ${location.pathname === '/faq' ? 'active' : ''}`}
            >
              FAQ
            </a>
          </li>
        </ul>

        <div className="login-btn-container">
          {token ? (
            <button className="login-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <button
              className={`login-btn ${location.pathname === '/login' ? 'active' : ''}`}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
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
            <a
              href="/"
              className={`mobile-menu-item ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </a>
          </li>
          <li>
              <button
                className={`mobile-menu-item ${location.pathname === '/register' ? 'active' : ''}`}
                onClick={() => navigate("/register")}
              >
                SignUp
              </button>
          </li>
          <li>
          <a
              href="#blog"
              className={`mobile-menu-item ${location.hash === '#blog' ? 'active' : ''}`}
            >
              Blog
            </a>
          </li>
          <li>
            <a
              href="/faq"
              className={`mobile-menu-item ${location.pathname === '/faq' ? 'active' : ''}`}
            >
              FAQ
            </a>
          </li>
            <div>
            {token ? (
              <button className="mobile-login-btn" onClick={handleLogout}>Logout</button>
            ) : (
              <button
                className={`login-btn ${location.pathname === '/login' ? 'active' : ''}`}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
