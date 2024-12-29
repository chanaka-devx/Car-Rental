import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


function Student() {

  const [student, setStudent] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:8081/')
    .then(res => setStudent(res.data))
    .catch(err => console.log(err));
  }, []) 

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:8081/student/'+id)
      window.location.reload();
    }catch(err) {
      console.log(err);
    }
  }

  return (
      <div className="flex justify-center items-center h-screen bg-blue-500">
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-1/2">
          
          <Link to="/create" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mb-4">
            Add +
          </Link>
          
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 border-b-2 border-gray-300 py-2 ">Name</th>
                <th className="p-3 border-b-2 border-gray-300 py-2 ">Email</th>
                <th className="p-3 border-b-2 border-gray-300 py-2 ">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                student.map((data, i)=>(
                  <tr key={i}>
                    <td>{data.Name}</td>
                    <td>{data.Email}</td>
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
    )
};

export default Student