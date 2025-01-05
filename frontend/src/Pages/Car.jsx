import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer.jsx';


function Car() {

  const [car, setCar] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:3003/')
    .then(res => setCar(res.data))
    .catch(err => console.log(err));
  }, []) 

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:3003/student/'+id)
      window.location.reload();
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div> <Navbar/> </div>
      <div className="p-5 flex flex-col items-center bg-gray-200 h-screen mt-5">
        <div className="bg-white m-6 p-6 rounded-lg shadow-md text-center w-full mt-20">
          
          <div className="flex flex-col items-start ">
            <Link to="/create" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mb-4 ">
              Add +
            </Link>
          </div>
          
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 border-b-2 border-gray-300 py-2 ">Brand</th>
                <th className="p-3 border-b-2 border-gray-300 py-2 ">Model</th>
                <th className="p-3 border-b-2 border-gray-300 py-2 ">Vehicle Number</th>
                <th className="p-3 border-b-2 border-gray-300 py-2 ">Color</th>
                <th className="p-3 border-b-2 border-gray-300 py-2 ">YOM</th>
                <th className="p-3 border-b-2 border-gray-300 py-2 ">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                car.map((data, i)=>(
                  <tr key={i}>
                    <td>{data.Brand}</td>
                    <td>{data.Model}</td>
                    <td>{data.Vnumber}</td>
                    <td>{data.Color}</td>
                    <td>{data.Yom}</td>
                    <td>
                      <Link to={`update/${data.ID}`} className='bg-blue-500 rounded-md p-2 m-2 hover:bg-blue-600'>Update</Link>
                      <button className='bg-red-500 rounded-md p-2 m-2 hover:bg-red-600'
                              onClick={ () => handleDelete(data.ID)}>
                          Delete
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full"><Footer/></div>
    </div>
    )
};

export default Car