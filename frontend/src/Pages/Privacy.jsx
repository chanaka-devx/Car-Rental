import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import PrivacyImage from "../Images/Privacy.png";
import "./Privacy.css";

const Privacy = () => {
  return (
    <div>
      <Navbar />
      <div className="privacy-container">
        <div className="privacy-box">
          <div className="privacy-left">
            <h2 className="privacy-title">RentRide <br/>Privacy Policy</h2>
            <p className="privacy-description">
              
            </p>
            <img
              src={PrivacyImage}
              alt="Illustration"
              className="privacy-image"
            />
          </div>
          <div className="privacy-right">
            <p className="description-privacy">
            This platform is committed to protecting the privacy of its users. 
            This privacy policy explains how we collect, use, and disclose your personal information when you use our platform.
            </p>
            <br/>
            
            <div className="privacy-points">
                <h3>Personal Information We Collect:</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Dolores sit necessitatibus architecto in ut quaerat ea nobis recusandae? 
                    Temporibus asperiores amet aperiam voluptatem quae culpa nobis tempora ad placeat iure!</p>
                <h3>How We Use Your Personal Information:</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Dolores sit necessitatibus architecto in ut quaerat ea nobis recusandae? 
                    Temporibus asperiores amet aperiam voluptatem quae culpa nobis tempora ad placeat iure!</p>
                <h3>Data Security:</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Dolores sit necessitatibus architecto in ut quaerat ea nobis recusandae? 
                    Temporibus asperiores amet aperiam voluptatem quae culpa nobis tempora ad placeat iure!</p>
                <h3>Changes to This Privacy Policy:</h3>
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

export default Privacy;
