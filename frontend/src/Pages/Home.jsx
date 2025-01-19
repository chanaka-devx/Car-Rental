import React from 'react';
import Navbar from '../Components/Navbar.jsx';
import './Home.css'; 
import Footer from '../Components/Footer.jsx';
import Description from '../Components/Description.jsx';
import Start from '../Components/Start.jsx';
import Ecosystem from '../Components/Ecosystem.jsx';
import Features from '../Components/Features.jsx';
import Rides from '../Components/Rides.jsx';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Start/>
      <Description/>
      <Features/>
      <Rides/>
      <Footer/>
    </div>
  );
};

export default Home;
