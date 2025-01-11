import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Named import for jwtDecode

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Decode the token
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decodedToken.exp < currentTime) {
        // Token expired
        localStorage.removeItem("token"); // Clear the token
        return <Navigate to="/" replace />; // Redirect to login
      }
      return children; // Token is valid, render the protected component
    } catch (err) {
      // Invalid token
      localStorage.removeItem("token");
      return <Navigate to="/" replace />;
    }
  }

  // No token found
  return <Navigate to="/" replace />;
};

export default PrivateRoute;
