import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./Login.css";
import { useNavigate } from "react-router-dom";

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
      console.log("Submitting login with values:", values); // Debugging log
      const response = await axios.post(
        "http://localhost:3003/auth/login",
        values
      );
      console.log("Response from server:", response.data);

      if (response.data.success) {
        setSuccess(response.data.message || "Login successful!");
        // Store token in localStorage
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        // Optionally, redirect to dashboard
        navigate("/dashboard");
        // window.location.href = "/dashboard";
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error from server:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
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
            <h2 className="login-title">Login</h2>
            <p className="login-description">Login to your account.</p>
            <img
              src="https://via.placeholder.com/400x300"
              alt="Illustration"
              className="login-image"
            />
          </div>

          {/* Right Section */}
          <div className="login-right">
            <h2 className="mobile-title">Welcome Back!</h2>
            <form onSubmit={handleSubmit}>

              {/* Display Success Message */}
              {success && (
                <div className="success-message">
                  {success}
                </div>
              )}
              {/* Display Error Message */}
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
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
