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
      await axios.delete('http://localhost:3003/student/' + id);
      window.location.reload();
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
          <table className="car-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Vehicle Number</th>
                <th>Color</th>
                <th>YOM</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {car.map((data, i) => (
                <tr key={i}>
                  <td>{data.ID}</td>
                  <td>{data.Brand}</td>
                  <td>{data.Model}</td>
                  <td>{data.Number}</td>
                  <td>{data.Color}</td>
                  <td>{data.YOM}</td>
                  <td>
                    <Link to={`update/${data.id}`} className="update-button">
                      Update
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(data.ID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Car;
