import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Appoinment.css";
import { Link } from "react-router-dom";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch booking data from the backend
    axios
      .get("http://localhost:5176/bookings") // Corrected API endpoint
      .then((res) => {
        setAppointments(res.data.data); // Access the data field in the response
        setLoading(false); // Data is loaded
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setLoading(false); // Stop loading even on error
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      // Ask for confirmation before proceeding
      const confirmDelete = window.confirm(
        "Are you sure?"
      );
      if (!confirmDelete) {
        return; // Exit if user cancels
      }

      // Proceed with deletion
      await axios.delete(`http://localhost:5176/bookings/${id}`);
      setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
      ); // Remove deleted item from state
      alert("Booking deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error deleting booking. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="appointments-container">
        <div className="appointments-content">
          <div className="header">List of Appointments</div>
          <div className="card-grid">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="card">
                    <Skeleton height={200} />
                    <Skeleton height={30} count={2} />
                  </div>
                ))
              : appointments.map((appointment) => (
                  <div key={appointment.id} className="card">
                    <h3>Booking Number {appointment.id}</h3>
                    <p>
                      <strong>Car ID:</strong> {appointment.car_id}
                    </p>
                    <p>
                      <strong>Name:</strong> {appointment.user_name}
                    </p>
                    <p>
                      <strong>Email:</strong> {appointment.user_email}
                    </p>
                    <p>
                      <strong>Phone Number:</strong> {appointment.user_phone}
                    </p>
                    <p>
                      <strong>Date:</strong> {appointment.booking_date}
                    </p>
                    <p>
                      <strong>Time:</strong> {appointment.booking_time}
                    </p>

                    <div className="card-actions">
                      <button className="update-button" onClick={() => handleDelete(appointment.id)}>
                      Accept
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(appointment.id)}>
                      Decline
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Appointments;
