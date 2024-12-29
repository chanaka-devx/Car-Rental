import React from 'react';
import Banner from '../Images/background.jpg'
import Navbar from '../Components/Navbar.jsx';

const DialogBox = () => {
  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div className="grid justify-center items-center min-h-screen" 
          style={{
              backgroundImage: `url(${Banner})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              opacity: '0.9'
            }}>
        
        <div className="mt-20 bg-gradient-to-r from-gray-800 via-transparent to-gray-800 rounded-3xl shadow-lg p-6 w-full max-w-3xl relative">
        <div className='mt-5 mb-5'>
          <h1 className='text-5xl font-bold text-white text-outline'>Your Journey starts here</h1>
        </div>
          <div className="flex gap-10 mt-10">
            
            <div className="flex-1">
              <label htmlFor="vehicle-type" className="block text-lg font-semibold text-white">Vehicle Type </label>
              <select id="vehicle-type" className="mt-1 pl-3 pr-2 block w-full border-gray-300 rounded-md shadow-sm ">
                <option value="">Select Vehicle</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="van">Van</option>
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="location" className="block text-lg font-semibold text-white">Location </label>
              <input
                type="text"
                id="location"
                placeholder="Enter location"
                className="mt-1 pl-3 pr-2 block w-full border-gray-300 rounded-md shadow-sm "
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-6 mt-10">
            
            <div className="flex-1">
              <label htmlFor="from-date" className="block text-lg font-semibold text-white">From</label>
              <input
                type="date"
                id="from-date"
                className="mt-1 pl-3 pr-2 block w-full border-gray-300 rounded-md shadow-sm "
                placeholder="dd/mm/yyyy"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="from-time" className="block text-lg font-semibold text-white">Time</label>
              <input
                type="time"
                id="from-time"
                className="mt-1 pl-3 pr-2 block w-full border-gray-300 rounded-md shadow-sm "
                placeholder="--:--"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="to-date" className="block text-lg font-semibold text-white">To</label>
              <input
                type="date"
                id="to-date"
                className="mt-1 pl-3 pr-2 block w-full border-gray-300 rounded-md shadow-sm "
                placeholder="dd/mm/yyyy"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="to-time" className="block text-lg font-semibold text-white">Time</label>
              <input
                type="time"
                id="to-time"
                className="mt-1 pl-3 pr-2 block w-full border-gray-300 rounded-md shadow-sm "
                placeholder="--:--"
              />
            </div>
          </div>

          <div className="mt-10 mb-3 text-center">
            <button className="bg-black text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-800">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default DialogBox;


//#2F3E4D gray
//#56E39F green
//#4DB8FF blue