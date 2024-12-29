import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/create' , {name,email})
        .then(res => {
            console.log('Response from server:', res.data);
            navigate('/');
        }).catch(err => console.log(err));
    }

  return (
    <div className="flex justify-center items-center h-screen bg-blue-500">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold mb-4 text-center">Add Student</h2>
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Enter Name" 
              className="form-control w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setName(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter Email" 
              className="form-control w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          
          <button type="submit" 
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStudent;
