import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer.jsx';
import './Car.css';

function Car() {
  const [car, setCar] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003/')
      .then(res => setCar(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:3003/car/${id}' + id);
      setCar(car.filter((c) => c.ID !== id)); // Remove deleted item from state
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="car-container">
        <div className="car-content">
          <div className='header'>List of Cars</div>
          <div className="add-button-container">
            <Link to="/create" className="add-button">
              Add +
            </Link>
          </div>
          <div className="card-grid">
            {car.map((data, i) => (
              <div key={i} className="car-card">
                <img
                  src={data.Image || '/placeholder-image.png'} // Use raw Dropbox link or fallback
                  alt={`${data.Brand} ${data.Model}`}
                  className="car-image"
                />
                <h3>{data.Brand} {data.Model}</h3>
                <p><strong>Vehicle Number:</strong> {data.Number}</p>
                <p><strong>Color:</strong> {data.Color}</p>
                <p><strong>Price:</strong> Rs.{data.Price}.00 / Day</p>
                <div className="card-actions">
                  <Link to={`update/${data.ID}`} className="update-button">
                    Update
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(data.ID)}
                  >
                    Delete
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
}

export default Car;
