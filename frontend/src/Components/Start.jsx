import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Start.css'; 

const Start = () => {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log('Searching for location:', location);
    setLoading(true); // Start loading

    fetch('http://localhost:5176/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location }),
    })
      .then((response) => {
        console.log('Response received:', response);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data received:', data);
        if (Array.isArray(data)) {
          setResults(data); // Ensure data is an array before setting it
        } else {
          setResults([]);
        }
        setError('');
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.error('Error occurred:', err);
        setError('An error occurred while searching for a car.');
        setResults([]);
        setLoading(false); // Stop loading even on error
      });
  };

  const handleBooking = (carId) => {
    navigate(`/booking/${carId}`); // Navigate to the booking page with carId
  };
  
  return (
      <div className="dialog-container">
        <div className="dialog-box">
          <div className="dialog-header">
            <h1>Your Journey starts here</h1>
          </div>
          <div className="dialog-flex">
            <div className="dialog-field">
              <label htmlFor="location">Location</label>
              <input  id="location"
                      type="text"
                      placeholder="Enter your location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)} />
            </div>
          </div>

          <div className="dialog-button-container">
            <button onClick={handleSearch} className="dialog-button">Search</button>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <ul className="car-list">
            {results.length > 0 ? (
              results.map((car) => (
                <li key={car.ID} className="car-item">
                  <h3>{car.Brand} {car.Model}</h3>
                  <p>Location: {car.Location}</p>
                  <p>Price: Rs.{car.Price}.00 / Day</p>
                  <img
                    src={car.Image}
                    alt={`${car.Brand} ${car.Model}`}
                  />
                  <button
                    onClick={() => handleBooking(car.ID)} // Redirect to booking page with carId
                    className="book-now-btn"
                  >
                    Book Now
                  </button>
                </li>
              ))
            ) : (
              <p>No cars found for this location.</p>
            )}
          </ul>

        </div>
      </div>
  );
};

export default Start;
