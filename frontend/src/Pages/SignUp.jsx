import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./SignUp.css";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/auth/signup", values)
      .then((res) => console.log("Response from server:", res.data))
      .catch((err) => console.error("Error from server:", err));
  };

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <div className="signup-box">
          <div className="signup-left">
            <h2 className="signup-title">Sign Up</h2>
            <p className="signup-description">
              Please fill this form to create a new account.
            </p>
            <img
              src="https://via.placeholder.com/400x300"
              alt="Illustration"
              className="signup-image"
            />
          </div>
          <div className="signup-right">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="form-input"
                  required
                  name="name"
                  value={values.name}
                  onChange={handleChanges}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile" className="form-label">
                  Mobile
                </label>
                <div className="flex">
                  <select className="form-select">
                    <option value="+94">🇱🇰 +94</option>
                  </select>
                  <input
                    type="text"
                    id="mobile"
                    placeholder="Mobile"
                    className="form-input"
                    required
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChanges}
                  />
                </div>
              </div>
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
                <span className="password-toggle">👁</span>
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="terms-checkbox"
                  required
                />
                <label htmlFor="terms" className="terms-label">
                  I agree to the{" "}
                  <a href="#terms" className="terms-link">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <button type="submit" className="submit-button">
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
