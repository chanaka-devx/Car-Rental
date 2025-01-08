import React from 'react';
import Navbar from '../Components/Navbar.jsx';
import './Home.css'; 
import Footer from '../Components/Footer.jsx';

const DialogBox = () => {
  return (
    <div>
      <Navbar />
      <div className="dialog-container">
        <div className="dialog-box">
          <div className="dialog-header">
            <h1>Your Journey starts here</h1>
          </div>
          <div className="dialog-flex">
            <div className="dialog-field">
              <label htmlFor="vehicle-type">Vehicle Type</label>
              <select id="vehicle-type">
                <option value="">Select Vehicle</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="van">Van</option>
              </select>
            </div>
            <div className="dialog-field">
              <label htmlFor="location">Location</label>
              <input type="text" id="location" placeholder="Enter location" />
            </div>
          </div>

          <div className="dialog-flex">
            <div className="dialog-field">
              <label htmlFor="from-date">From</label>
              <input type="date" id="from-date" />
            </div>
            <div className="dialog-field">
              <label htmlFor="from-time">Time</label>
              <input type="time" id="from-time" />
            </div>
            <div className="dialog-field">
              <label htmlFor="to-date">To</label>
              <input type="date" id="to-date" />
            </div>
            <div className="dialog-field">
              <label htmlFor="to-time">Time</label>
              <input type="time" id="to-time" />
            </div>
          </div>

          <div className="dialog-button-container">
            <button className="dialog-button">Search</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default DialogBox;
