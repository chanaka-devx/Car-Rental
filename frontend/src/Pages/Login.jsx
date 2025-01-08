import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./Login.css";

const Login = () => {
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
            <form>
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
                />
                <span className="password-toggle">👁</span>
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
