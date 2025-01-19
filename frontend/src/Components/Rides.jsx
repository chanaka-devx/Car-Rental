import React, { useRef, useState, useEffect } from 'react';
import './Rides.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Rides = () => {
  const navigate = useNavigate();
  const scrollContainer = useRef(null);

  const [cars, setCars] = useState([]); // State to store fetched cars
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch all cars when the component loads
  useEffect(() => {
    axios
      .get("http://localhost:5176/api/cars")
      .then((res) => {
        console.log("API Response:", res.data);
        setCars(res.data.cars);
        setLoading(false); // Data is loaded
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading even on error
      });
  }, []);

  const scrollLeft = () => {
    scrollContainer.current.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollContainer.current.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  const handleBookNow = async (carId) => {
    try {
      const response = await axios.get(`http://localhost:5176/bookings/status/${carId}`);
      if (response.data.success) {
        if (response.data.booked) {
          alert('This car is already booked. Please choose another car.');
        } else {
          navigate(`/booking/${carId}`);
        }
      } else {
        alert('Unable to check booking status. Please try again later.');
      }
    } catch (err) {
      console.error('Error checking booking status:', err);
      alert('An error occurred while checking booking status.');
    }
  };

  return (
    <div className="rides-container">
      <h1>Find your next ride</h1>
      {loading ? (
        <p>Loading cars...</p>
      ) : (
        <div className="scroll-buttons">
          <button className="arrow-button" onClick={scrollLeft}>
            &#8249;
          </button>
          <div className="rides-scroll" ref={scrollContainer}>
            {cars.map((car) => (
              <div className="card" key={car.ID}>
                <div className="card-image">
                  <img src={car.Image} alt={car.name} />
                  <div className="price-tag">Rs.{car.Price} / Day</div>
                </div>
                <div className="card-content">
                  <h3>{car.Brand} {car.Model}</h3>
                  <p>{car.Location}</p>
                  <div className="ratings">
                    {Array(car.rating)
                      .fill()
                      .map((_, index) => (
                        <span key={index} className="star filled">★</span>
                      ))}
                    
                    <span className="reviews">({car.reviews})</span>
                  </div>
                  <button onClick={() => handleBookNow(car.ID)} className="book-now">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="arrow-button" onClick={scrollRight}>
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
};

export default Rides;
