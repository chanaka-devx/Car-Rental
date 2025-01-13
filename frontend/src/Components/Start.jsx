import React from 'react';
import './Start.css'; 

const Start = () => {
  return (
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
                <option value="bike">SUV</option>
              </select>
            </div>
            <div className="dialog-field">
              <label htmlFor="location">Location</label>
              <input type="text" id="location" placeholder="Enter location" />
            </div>
          </div>

          

          <div className="dialog-button-container">
            <button className="dialog-button">Search</button>
          </div>
        </div>
      </div>
  );
};

export default Start;
