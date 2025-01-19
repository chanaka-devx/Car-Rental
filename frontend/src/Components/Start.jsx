import React, { useState } from 'react';
import './Start.css'; 

const Start = () => {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = () => {
    console.log('Searching for location:', location);
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
        setResults(data);
        setError('');
      })
      .catch((err) => {
        console.error('Error occurred:', err);
        setError('An error occurred while fetching data.');
        setResults([]);
      });
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
          <div style={{ marginTop: '20px' }}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {results.length === 0 && !error && <p>No vehicles available for this location.</p>}
            {results.map((item, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <strong>Location:</strong> {item.Location}
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
  );
};

export default Start;
