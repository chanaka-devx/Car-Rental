import React from 'react';
import './Description.css';
import Car from '../Images/img-1.jpg';

const Description = () => {
  return (
    <div className="rental-container">
      <div className="rental-content">
        <h1>Not your typical rental car</h1>
        <p>
          Forget expensive, impersonal rental car companies - RentRide Cars offers a revolutionary new way 
          to rent out and hire vehicles. Our peer-to-peer platform revolutionises the industry, offering 
          personalised options that established car rental companies don't.
        </p>
        <p>
          If you own vehicles, you can generate passive income from unused vehicles hassle-free; if you 
          are in the mood to rent, you can find the ideal car for your needs at affordable prices.
        </p>
        <p>
          Who said earning money had to be hard work? 
          With our easy-to-use platform, getting in control of your finances has never been simpler - what 
          are you waiting for?
        </p>
        <button className="register-button">Register</button>
      </div>
      <div className="rental-image">
        <img src={Car} alt="Car in sunset" />
      </div>
    </div>
  );
};

export default Description;
