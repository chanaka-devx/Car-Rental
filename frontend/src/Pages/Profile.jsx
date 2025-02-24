import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer.jsx';
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    Mobile: "",
  });
  const [loading, setLoading] = useState(true);

  // Get user ID from localStorage
  const userId = localStorage.getItem("userId");

  // Fetch user data from the database
  useEffect(() => {
    if (!userId) {
      console.error("User ID is not available.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5176/api/profile/${userId}`) // Include user ID in the API endpoint
      .then((res) => {
        console.log("API Response:", res.data);
        if (res.data.success && res.data.user) {
          setUser(res.data.user);
          navigate(`/profile/${userId}`); // Ensure response structure matches
        } else {
          console.error("Failed to fetch user data:", res.data.message);
        }
        setLoading(false); // Data is loaded
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setLoading(false); // Stop loading even on error
      });
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>; // Display loading state
  }

  return (
    <div>
      <Navbar />
      <div className="profile-page">
        {/* Sidebar Section */}
        <aside className="sidebar">
          <div className="user-info">
            <div className="avatar">
              {user.Name ? user.Name.charAt(0).toUpperCase() : ""}
            </div>
            <h3>{user.Name}</h3>
            <p>{user.Email}</p>
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
              <input type="text" value={user.Name || ""} readOnly />
            </div>
            <div className="info-group">
              <label>E-mail:</label>
              <input type="text" value={user.Email || ""} readOnly />
            </div>
            <div className="info-group">
              <label>Mobile:</label>
              <input type="text" value={user.Mobile || ""} readOnly />
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
