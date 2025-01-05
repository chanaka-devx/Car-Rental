import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Login = () => {
  return (
    <div>
      <div><Navbar/></div>
      <div className="min-h-screen flex justify-center items-center bg-gray-200">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl flex overflow-hidden  mt-20">
          {/* Left Section */}
          <div className="w-1/2 bg-gray-50 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Login</h2>
            <p className="text-gray-600 mb-6">
              Login to your account.
            </p>
            <img
              src="https://via.placeholder.com/400x300"
              alt="Illustration"
              className="w-full"
            />
          </div>

          <div className="w-1/2 p-10">
            <form>
              <div className="mt-4 mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 text-start mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="form-control w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-4 mt-4 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 text-start mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="form-control w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <span className="absolute right-3 top-9 text-gray-500 cursor-pointer">
                  👁
                </span>
              </div>

              

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600"
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
      <div><Footer/></div>
    </div>
  );
};

export default Login;
