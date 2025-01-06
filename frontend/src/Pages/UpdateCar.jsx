import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer.jsx';

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
      <div className="flex flex-col items-center bg-gray-200 mt-5">
        <div className="bg-white p-6 rounded-lg shadow-md w-1/2 mt-20 mb-10">
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-4 text-center">Update Car</h2>

            <div className="mb-4">
              <label htmlFor="brand" className="block text-sm font-medium mb-2 text-start">Brand</label>
              <input
                type="text"
                id="brand"
                placeholder="Enter Brand"
                className="form-control w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={e => setBrand(e.target.value)}
                value={brand}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="model" className="block text-sm font-medium mb-2 text-start">Model</label>
              <input
                type="text"
                id="model"
                placeholder="Enter Model"
                className="form-control w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={e => setModel(e.target.value)}
                value={model}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="vnumber" className="block text-sm font-medium mb-2 text-start">Vehicle Number</label>
              <input
                type="text"
                id="vnumber"
                placeholder="Enter Vehicle Number"
                className="form-control w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={e => setVnumber(e.target.value)}
                value={vnumber}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="color" className="block text-sm font-medium mb-2 text-start">Color</label>
              <input
                type="text"
                id="color"
                placeholder="Enter Color"
                className="form-control w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={e => setColor(e.target.value)}
                value={color}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="yom" className="block text-sm font-medium mb-2 text-start">Year of Manufacture (YOM)</label>
              <input
                type="text"
                id="yom"
                placeholder="Enter Year of Manufacture"
                className="form-control w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={e => setYom(e.target.value)}
                value={yom}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-6 mb-4">
              Update
            </button>
          </form>
        </div>
        <div className="w-full"><Footer /></div>
      </div>
    </div>
  );
};

export default UpdateCar;
