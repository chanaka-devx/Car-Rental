import React from "react";
import Navbar from "../Components/Navbar";
import Start from "../Components/Start";
import Rides from "../Components/Rides";
import Footer from "../Components/Footer";

const Dashboard = () => {
  return (
      <div>
      <Navbar />
      <Start/>
      <Rides/>
      <Footer/>
    </div>
  );
};

export default Dashboard;
