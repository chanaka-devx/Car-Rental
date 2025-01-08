import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer.jsx";
import "./UpdateCar.css";

const UpdateCar = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [vnumber, setVnumber] = useState('');
  const [color, setColor] = useState('');
  const [yom, setYom] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios.put('http://localhost:8081/update/' + id, { brand, model, vnumber, color, yom })
      .then(res => {
        console.log('Response from server:', res.data);
        navigate('/');
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <div><Navbar /></div>
      <div className="update-car-container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2 className="form-title">Update Car</h2>

            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                placeholder="Enter Brand"
                onChange={e => setBrand(e.target.value)}
                value={brand}
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                id="model"
                placeholder="Enter Model"
                onChange={e => setModel(e.target.value)}
                value={model}
              />
            </div>

            <div className="form-group">
              <label htmlFor="vnumber">Vehicle Number</label>
              <input
                type="text"
                id="vnumber"
                placeholder="Enter Vehicle Number"
                onChange={e => setVnumber(e.target.value)}
                value={vnumber}
              />
            </div>

            <div className="form-group">
              <label htmlFor="color">Color</label>
              <input
                type="text"
                id="color"
                placeholder="Enter Color"
                onChange={e => setColor(e.target.value)}
                value={color}
              />
            </div>

            <div className="form-group">
              <label htmlFor="yom">Year of Manufacture (YOM)</label>
              <input
                type="text"
                id="yom"
                placeholder="Enter Year of Manufacture"
                onChange={e => setYom(e.target.value)}
                value={yom}
              />
            </div>

            <button type="submit" className="submit-button">Update</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default UpdateCar;
