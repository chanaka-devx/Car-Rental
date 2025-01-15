import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import AboutImage from "../Images/About.png";
import "./About.css";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <div className="signup-box">
          <div className="signup-left">
            <h2 className="signup-title">About Us</h2>
            <p className="signup-description">
              
            </p>
            <img
              src={AboutImage}
              alt="Illustration"
              className="signup-image"
            />
          </div>
          <div className="signup-right">
            <p className="description">
            The idea of starting RentRide Cars arises with a vision of providing travellers with their desired rental vehicles. 
            For many traditional car rentals, vehicles offered are usually overpriced or, in some cases, unregulated. 
            RentRide aims to provide a platform where its members can easily access better, and unique vehicles at more affordable prices. 
            No more guessing whether your next vehicle is what you saw online!
            </p>
            <br/>
            
            <div className="mission">
                <h3>Our Mission</h3>
                <p>Our mission is to provide a platform where travellers can easily access better, and unique vehicles at more affordable prices.</p>
                <h3>Our Vision</h3>
                <p>Our vision is to be the leading vehicle rental platform in Sri Lanka.</p>
            </div>
            <div className="contact">
            <h3>Contact Us</h3>
                <p>RentRide Car Rentals (Private) Limited.</p>
                No. 111, A B C Mawatha, Colombo 01, Sri Lanka.<br/>
                Hotline: +1 (123) 456-7890<br/>
                Email: support@rentride.com<br/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
