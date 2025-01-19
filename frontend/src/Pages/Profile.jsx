import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer.jsx';
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: ""
  });

  // Fetch user data from the database
  useEffect(() => {
    axios
      .get('http://localhost:5176/') // Ensure this endpoint returns user data
      .then((res) => {
        if (res.data) {
          setUser({
            name: res.data.name || "",
            email: res.data.email || "",
            mobile: res.data.mobile || "",
          });
        }
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="profile-page">
        {/* Sidebar Section */}
        <aside className="sidebar">
          <div className="user-info">
            <div className="avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <nav className="menu">
            <ul>
              <li>Profile</li>
              <li>Edit Profile</li>
              <li>Current Bookings and Rentals</li>
              <li>Booking History</li>
              <li>Your Vehicles</li>
              <li>Rental History</li>
              <li>Notifications</li>
            </ul>
          </nav>
          <div className="summary">
            <h4>Your Profile Summary</h4>
            <p>Total Reviews: 0</p>
            <p>Vehicles Booked: 0</p>
            <p>Current Bookings: 0</p>
            <p>Vehicles Added: 0</p>
          </div>
        </aside>

        {/* Main Content Section */}
        <main className="main-content">
          <h2>Profile</h2>

          {/* User Information */}
          <section className="profile-section">
            <h3>User Information</h3>
            <div className="info-group">
              <label>Name:</label>
              <input type="text" value={user.name} readOnly />
            </div>
            <div className="info-group">
              <label>E-mail:</label>
              <input type="text" value={user.email} readOnly />
            </div>
            <div className="info-group">
              <label>Mobile:</label>
              <input type="text" value={user.mobile} readOnly />
            </div>
            <div className="info-group">
              <label>Driving License / Valid Identification:</label>
              <input type="text" value="NOT ADDED" readOnly />
            </div>
          </section>

          {/* Rental Information */}
          <section className="profile-section">
            <h3>Rental Information</h3>
            <div className="info-group">
              <label>Total Reviews:</label>
              <input type="text" value="0" readOnly />
            </div>
            <div className="info-group">
              <label>Vehicles Booked:</label>
              <input type="text" value="0" readOnly />
            </div>
            <div className="info-group">
              <label>Current Bookings:</label>
              <input type="text" value="0" readOnly />
            </div>
            <div className="info-group">
              <label>Vehicles Added:</label>
              <input type="text" value="0" readOnly />
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
