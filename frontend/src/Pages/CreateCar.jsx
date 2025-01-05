import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer.jsx';

const CreateCar = () => {
    const[brand, setBrand] = useState('')
    const[model, setModel] = useState('')
    const[vnumber, setVnumber] = useState('')
    const[color, setColor] = useState('')
    const[yom, setYom] = useState('')
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/create' , {brand,model,vnumber,color,yom})
        .then(res => {
            console.log('Response from server:', res.data);
            navigate('/');
        }).catch(err => console.log(err));
    }

  return (
    <div>
      <div> <Navbar/> </div>
      <div className=" flex flex-col items-center bg-gray-200 mt-5">
        <div className="bg-white p-6 rounded-lg shadow-md w-1/2 mt-20 mb-10">
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-4 text-center">Add Car</h2>
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-start">Brand</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter Brand" 
                className="form-control w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={e => setBrand(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-start">Model</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter Model" 
                className="form-control w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={e => setModel(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-start">Vehicle Number</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter Vehicle Number" 
                className="form-control w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={e => setVnumber(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-start">Color</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter Color" 
                className="form-control w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={e => setColor(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-start">YOM</label>
              <input 
                type="text" 
                id="number" 
                placeholder="Enter Year of Made" 
                className="form-control w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={e => setYom(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" 
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-6 mb-4">
                  Add
            </button>
          </form>
        </div>
        <div className="w-full"><Footer/></div>
      </div>
    </div>
  );
};

export default CreateCar;
