import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import LoginImage from "../Images/Login.jpg";
import {jwtDecode} from "jwt-decode";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      console.log("Submitting login with values:", values); 
      const response = await axios.post(
        "http://localhost:5176/auth/login",
        values
      );
      console.log("Response from server:", response.data);

      // Get token from response
      const { token } = response.data;
      const { role } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Decode token to check role
      console.log(role)

      if (role === 'admin') {
        navigate('/admin-dashboard'); // Admin route
      } else {
        navigate('/dashboard'); // User route
      }
      
    } catch (err) {
      setLoading(false);
      console.error("Error from server:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
        navigate("/login");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };
  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-box">
          {/* Left Section */}
          <div className="login-left">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-description">Login to your account.</p>
            <img
              src={LoginImage}
              alt="Illustration"
              className="login-image"
            />
          </div>

          {/* Right Section */}
          <div className="login-right">
            <h2 className="mobile-title">Welcome Back!</h2>
            <form onSubmit={handleSubmit}>

              {success && (
                <div className="success-message">
                  {success}
                </div>
              )}
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="form-input"
                  required
                  name="email"
                  value={values.email}
                  onChange={handleChanges}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="form-input"
                  required
                  name="password"
                  value={values.password}
                  onChange={handleChanges}
                />
                <span
                  className="password-toggle"
                  onClick={() => {
                    const passwordInput = document.getElementById("password");
                    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
                  }}
                  style={{ cursor: "pointer", position: "absolute", right: "10px", top: "35px" }}
                >👁</span>
              </div>

              <button type="submit" className="submit-button">
                LOGIN
              </button>

              <div className="signup-section">
                <p>Don't have an account? <Link to="/register" className="signup-link">Sign Up</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
