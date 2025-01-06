import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () =>{

    return(
        <div className="bg-gray-800 text-gray-400 text-center py-4">
            <h4>Follow us on</h4>
        <div className="mt-3 mb-3 flex justify-center space-x-6 text-lg mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaLinkedin />
            </a>
        </div>

        <div className="flex flex-wrap justify-center space-x-4 text-sm">
            <a href="#about" class="hover:text-white">About Us</a>
            <span>|</span>
            <a href="#privacy-policy" class="hover:text-white">Privacy Policy</a>
            <span>|</span>
            <a href="#terms" class="hover:text-white">Terms & Conditions</a>
            <span>|</span>
            <a href="#faq" class="hover:text-white">FAQ</a>
            <span>|</span>
            <a href="#promote" class="hover:text-white">List Your Vehicle</a>
            <span>|</span>
            <a href="#contact" class="hover:text-white">Contact</a>
            <span>|</span>
            <a href="#publish" class="hover:text-white">Publish your ad for free</a>
        </div>

        <div className="mt-4 text-sm">
            <p>
            copyright © 2025 <a href="https://RentRide.com" class="text-white hover:underline">RentRide  </a> 
            | developing by <a href="https://lankanrentals.com" class="text-white hover:underline">  Chanaka Malawige</a>
            </p>
        </div>
        </div>
    );
};
export default Footer;
