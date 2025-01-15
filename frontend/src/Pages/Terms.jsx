import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import TermsImage from "../Images/Terms.png";
import "./Terms.css";

const Terms = () => {
  return (
    <div>
      <Navbar />
      <div className="terms-container">
        <div className="terms-box">
          <div className="terms-left">
            <h2 className="terms-title">RentRide <br/>Terms & Conditions</h2>
            <p className="terms-description">
              
            </p>
            <img
              src={TermsImage}
              alt="Illustration"
              className="terms-image"
            />
          </div>
          <div className="terms-right">
            <p className="description-terms">
            This platform is committed to protecting the privacy of its users. 
            This privacy policy explains how we collect, use, and disclose your personal information when you use our platform.
            </p>
            <br/>
            
            <div className="terms-points">
                <h3>Eligibility: </h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Dolores sit necessitatibus architecto in ut quaerat ea nobis recusandae? 
                    Temporibus asperiores amet aperiam voluptatem quae culpa nobis tempora ad placeat iure!</p>
                <h3>Registration:</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Dolores sit necessitatibus architecto in ut quaerat ea nobis recusandae? 
                    Temporibus asperiores amet aperiam voluptatem quae culpa nobis tempora ad placeat iure!</p>
                <h3>Hiring a Vehicle:</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Dolores sit necessitatibus architecto in ut quaerat ea nobis recusandae? 
                    Temporibus asperiores amet aperiam voluptatem quae culpa nobis tempora ad placeat iure!</p>
                <h3>Fault Reporting:</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Dolores sit necessitatibus architecto in ut quaerat ea nobis recusandae? 
                    Temporibus asperiores amet aperiam voluptatem quae culpa nobis tempora ad placeat iure!</p>
                <h3>Return Policy:</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Dolores sit necessitatibus architecto in ut quaerat ea nobis recusandae? 
                    Temporibus asperiores amet aperiam voluptatem quae culpa nobis tempora ad placeat iure!</p>
                <h3>Fee and Payment:</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Dolores sit necessitatibus architecto in ut quaerat ea nobis recusandae? 
                    Temporibus asperiores amet aperiam voluptatem quae culpa nobis tempora ad placeat iure!</p>
                <h3>Maintenance and Safety:</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Dolores sit necessitatibus architecto in ut quaerat ea nobis recusandae? 
                    Temporibus asperiores amet aperiam voluptatem quae culpa nobis tempora ad placeat iure!</p>
                <h3>Termination:</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Dolores sit necessitatibus architecto in ut quaerat ea nobis recusandae? 
                    Temporibus asperiores amet aperiam voluptatem quae culpa nobis tempora ad placeat iure!</p>
            </div>
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
