import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Booking.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";

const Booking = () => {
  const { carId } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    booking_date: "",
    booking_time: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch car details from the backend using carId
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:5176/car/${carId}`);
        console.log("Car details:", response.data);
        setCar(response.data);
      } catch (err) {
        console.error("Error fetching car details:", err);
        setCar(null);
      }
    };

    fetchCar();
  }, [carId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      car_id: carId,
      ...formData,
    };

    console.log("Booking data:", bookingData);

    fetch("http://localhost:5176/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); 
        } else {
          throw new Error("Failed to book the car.");
        }
      })
      .then((data) => {
        alert("Booking successful!");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred.");
      });
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="booking-container">
        <div className="booking-box">
          <div className="booking-left">
            <h2 className="booking-title">Book Your Car</h2>
            <p className="booking-description">
              Complete the form below to confirm your booking for the{" "}
              <strong>{car.Brand} {car.Model}</strong>.
            </p>
            <img
              src={car.Image || "/placeholder-image.png"}
              alt={`${car.Brand} ${car.Model}`}
              className="booking-image"
            />
          </div>
          <div className="booking-right">
            <form onSubmit={handleSubmit}>
              {success && <div className="success-message">{success}</div>}
              {error && <div className="error-message">{error}</div>}
              <div className="form-group">
                <label className="form-label" htmlFor="user_name">
                  Name:
                  <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <br />
                <label className="form-label" htmlFor="user_email">
                  Email:
                  <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <br />
                <label className="form-label" htmlFor="user_phone">
                  Phone:
                  <input
                    type="tel"
                    name="user_phone"
                    value={formData.user_phone}
                    onChange={handleChange}
                    required
                  />
                </label>
                <br />
                <label className="form-label" htmlFor="booking_date">
                  Booking Date:
                  <input
                    type="date"
                    name="booking_date"
                    value={formData.booking_date}
                    onChange={handleChange}
                    required
                  />
                </label>
                <br />
                <label className="form-label" htmlFor="booking_time">
                  Booking Time:
                  <input
                    type="time"
                    name="booking_time"
                    value={formData.booking_time}
                    onChange={handleChange}
                    required
                  />
                </label>
                <br />
                <button type="submit" className="submit-button">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
