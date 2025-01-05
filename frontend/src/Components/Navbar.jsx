import React, { useState } from 'react';
import RentRide from '../../src/Images/logo3.png';
import {Link} from 'react-router-dom';
import SignUp from '../Pages/SignUp';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 shadow-md fixed top-0 left-0 w-full z-50 rounded-b-xl">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={RentRide} alt="Logo" className="h-12 w-13" />
        </div>

        
        <ul className={`hidden md:flex space-x-8 text-gray-400 font-semibold`}>
          <li>
            <a href="#list-your-vehicle" className="hover:text-white">
              List Your Vehicle
            </a>
          </li>
          <li>
            <Link to={'signup'} className="hover:text-white">
              Sign Up
            </Link>
          </li>
          <li>
            <a href="#blog" className="hover:text-white">
              Blog
            </a>
          </li>
          <li>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
          </li>
        </ul>

        
        <div className="hidden md:block">
          <Link to={'Login'} className="bg-gradient-to-r from-blue-400 to-green-400 text-white font-semibold px-8 py-2 rounded-full hover:from-blue-500 hover:to-green-500 text-lg">
            Login
          </Link>
        </div>

        
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
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

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:hidden bg-white shadow-md absolute top-16 left-0 w-full px-4 py-6`}
      >
        <ul className="space-y-4 text-gray-900 font-semibold">
          <li>
            <a href="#list-your-vehicle" className="hover:text-blue-500">
              List Your Vehicle
            </a>
          </li>
          <li>
            <Link to={'signup'} className="hover:text-blue-500">
              Sign Up
            </Link>
          </li>
          <li>
            <a href="#blog" className="hover:text-blue-500">
              Blog
            </a>
          </li>
          <li>
            <a href="#faq" className="hover:text-blue-500">
              FAQ
            </a>
          </li>
          <li>
            <Link to={'Login'} className="bg-gradient-to-r from-blue-400 to-green-400 text-white font-semibold px-8 py-2 rounded-full hover:from-blue-500 hover:to-green-500 text-lg">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
