import React from 'react';
import './Ecosystem.css';
import Hire from '../Images/Hire.png';
import Host from '../Images/Host.png'

const Ecosystem = () => {
  return (
  <div className="ecosystem">
    <h1>RentRide Ecosystem</h1>
    <div className="ecosystem-cards">
      <div className="ecosystem-card">
        <div className="card-images">
          <img className="card-image" src={Hire} alt="ROFI Hirers" />
        </div>
        <div class="card-content">
          <h2>RentRide Hirers</h2>
          <p>
            Once you are registered on RentRide, congrats, you are now a RentRide member, 
            and you can start choosing from thousands of vehicles and find your 
            perfect match!
          </p>
          <button className="register-button">Register Now</button>
        </div>
      </div>

      
      <div className="ecosystem-card">
        <div className="card-images">
          <img className="card-image" src={Host} alt="ROFI Hosts" />
        </div>
        <div className="card-content">
          <h2>RentRide Hosts</h2>
          <p>
            RentRide Hosts are made up of countless vehicle owners. RentRide members can 
            easily sign up to be RentRide hosts and start earning from their vehicles. 
            Conditions applied.
          </p>
          <button className="register-button">Register Now</button>
        </div>
      </div>
    </div>
  </div>

  );
};

export default Ecosystem;
