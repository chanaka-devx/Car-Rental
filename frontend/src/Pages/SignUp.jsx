import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {

    const [values, setValues] = useState({
      name: '',
      mobile: '',
      email: '',
      passowrd: '',
    })

    const handleChanges = (e) => {
      setValues ({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8081/auth/register', values);
        console.log('Response:', response.data);
      } catch (err) {
        if (err.response) {
          console.error('Error Response:', err.response.data);
        } else {
          console.error('Error:', err.message);
        }
      }
    
      
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-600">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl flex overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 bg-gray-50 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Sign Up</h2>
          <p className="text-gray-600 mb-6">
            Please fill this form to create a new account.
          </p>
          <img
            src="https://via.placeholder.com/400x300"
            alt="Illustration"
            className="w-full"
          />
        </div>

        <div className="w-1/2 p-10">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="pl-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                required
                name="name"
                onChange={handleChanges}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 text"
              >
                Mobile *
              </label>
              <div className="flex">
                <select
                  className="border-gray-300 rounded-l-md focus:ring-orange-500 focus:border-orange-500"
                  style={{ width: "80px" }}
                >
                  <option value="+94">🇱🇰 +94</option>
                </select>
                <input
                  type="text"
                  id="mobile"
                  placeholder="Mobile"
                  className="pl-1 mt-1 flex-1 block w-full border-gray-300 rounded-r-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  required
                  name="mobile"
                  onChange={handleChanges}
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="pl-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                required
                name="email"
                onChange={handleChanges}
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password *
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="pl-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                required
                name="password"
                onChange={handleChanges}
              />
              <span className="absolute right-3 top-6 text-gray-500 cursor-pointer">
                👁
              </span>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                required
              />
              <label
                htmlFor="terms"
                className="ml-2 text-sm text-gray-600"
              >
                I agree to the{" "}
                <a href="#terms" className="text-blue-500 hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-5 w-full bg-blue-500 text-white py-2 rounded-xl shadow-md hover:bg-blue-600"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
