import React, { useRef } from 'react';
import './Rides.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Rides = () => {
  const navigate = useNavigate();
  const scrollContainer = useRef(null);

  const scrollLeft = () => {
    scrollContainer.current.scrollBy({
      left: -300, // Adjust scroll distance as needed
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollContainer.current.scrollBy({
      left: 300, // Adjust scroll distance as needed
      behavior: 'smooth',
    });
  };

  const handleBookNow = async (carId) => {
    try {
      // Check booking status before navigating
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

  const cars = [
    {
      id: 1,
      name: "TATA Nano",
      price: "Rs. 4,500.00 / Day",
      km: "100 KM / Day",
      location: "Nugegoda",
      rating: 0,
      reviews: 0,
      image: "tata-nano.jpg",
    },
    {
      id: 2,
      name: "Suzuki Alto",
      price: "Rs. 6,500.00 / Day",
      km: "100 KM / Day",
      location: "Nugegoda",
      rating: 0,
      reviews: 0,
      image: "suzuki-alto1.jpg",
    },
    {
      id: 3,
      name: "TATA Nano",
      price: "Rs. 4,500.00 / Day",
      km: "100 KM / Day",
      location: "Nugegoda",
      rating: 0,
      reviews: 0,
      image: "tata-nano.jpg",
    },
    {
      id: 4,
      name: "Suzuki Alto",
      price: "Rs. 6,500.00 / Day",
      km: "100 KM / Day",
      location: "Nugegoda",
      rating: 0,
      reviews: 0,
      image: "suzuki-alto1.jpg",
    },
    {
      id: 5,
      name: "TATA Nano",
      price: "Rs. 4,500.00 / Day",
      km: "100 KM / Day",
      location: "Nugegoda",
      rating: 0,
      reviews: 0,
      image: "tata-nano.jpg",
    },
    {
      id: 6,
      name: "Suzuki Alto",
      price: "Rs. 6,500.00 / Day",
      km: "100 KM / Day",
      location: "Nugegoda",
      rating: 0,
      reviews: 0,
      image: "suzuki-alto1.jpg",
    },
    // Add more car objects...
  ];

  return (
    <div className="rides-container">
      <h1>Find your next ride</h1>
      <div className="scroll-buttons">
        <button className="arrow-button" onClick={scrollLeft}>
          &#8249;
        </button>
        <div className="rides-scroll" ref={scrollContainer}>
          {cars.map((car) => (
            <div className="card" key={car.id}>
              <div className="card-image">
                <img src={car.image} alt={car.name} />
                <div className="price-tag">{car.price}</div>
              </div>
              <div className="card-content">
                <h3>{car.name}</h3>
                <p>{car.location}</p>
                <p className="km">{car.km}</p>
                <div className="ratings">
                  {Array(car.rating)
                    .fill()
                    .map((_, index) => (
                      <span key={index} className="star filled">★</span>
                    ))}
                  {Array(5 - car.rating)
                    .fill()
                    .map((_, index) => (
                      <span key={index} className="star">☆</span>
                    ))}
                  <span className="reviews">({car.reviews})</span>
                </div>
                <button onClick={() => handleBookNow(car.id)} className="book-now">
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
    </div>
  );
};

export default Rides;
