import React from "react";

const Login = () => {
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
          <form>
            <div className="mt-4 mb-4">
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
              />
            </div>

            {/* Password */}
            <div className="mb-4 mt-4 relative">
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
              />
              <span className="absolute right-3 top-6 text-gray-500 cursor-pointer">
                👁
              </span>
            </div>

            

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-xl shadow-md hover:bg-blue-600"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
