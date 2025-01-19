import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer.jsx";
import "./Car.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Car() {
  const [car, setCar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5176/")
      .then((res) => {
        setCar(res.data);
        setLoading(false); // Data is loaded
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading even on error
      });
  }, []);

  console.log(car)

  const handleDelete = async (id) => {
    try {
      // Ask for confirmation before proceeding
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this car?"
      );
      if (!confirmDelete) {
        return; // Exit if user cancels
      }

      // Proceed with deletion
      const cleanId = id.toString().trim();
      await axios.delete(`http://localhost:5176/car/${cleanId}`);
      setCar(car.filter((c) => c.ID !== id)); // Remove deleted item from state
      alert("Car deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error deleting car. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="car-container">
        <div className="car-content">
          <div className="header">List of Cars</div>
          <div className="add-button-container">
            <Link to="/create" className="add-button">
              Add +
            </Link>
          </div>
          <div className="card-grid">
            {loading
              ? Array.from({ length: 4 }).map(
                  (
                    _,
                    i 
                  ) => (
                    <div key={i} className="car-card">
                      <Skeleton
                        height={200}
                        width="100%"
                        style={{ marginBottom: "10px" }}
                      />{" "}
                      {/* Image Skeleton */}
                      <Skeleton
                        height={20}
                        width="60%"
                        style={{ marginBottom: "5px" }}
                      />{" "}
                      {/* Title Skeleton */}
                      <Skeleton
                        height={15}
                        width="80%"
                        style={{ marginBottom: "5px" }}
                      />{" "}
                      {/* Details Skeleton */}
                      <Skeleton
                        height={15}
                        width="80%"
                        style={{ marginBottom: "5px" }}
                      />
                      <Skeleton
                        height={15}
                        width="80%"
                        style={{ marginBottom: "5px" }}
                      />
                      <Skeleton height={40} width="100%" />{" "}
                      {/* Button Skeleton */}
                    </div>
                  )
                )
              : car.map((data, i) => (
                  <div key={i} className="car-card">
                    <img
                      src={data.Image || "/placeholder-image.png"}
                      alt={`${data.Brand} ${data.Model}`}
                      className="car-image"
                    />
                    <h3>
                      {data.Brand} {data.Model}
                    </h3>
                    <p>
                      <strong>Vehicle Number:</strong> {data.Number}
                    </p>
                    <p>
                      <strong>Color:</strong> {data.Color}
                    </p>
                    <p>
                      <strong>Location:</strong> {data.Location}
                    </p>
                    <p>
                      <strong>Price:</strong> Rs.{data.Price}.00 / Day
                    </p>
                    <div className="card-actions">
                      <Link to={`/update/${data.ID}`} className="update-button">
                        Update
                      </Link>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(data.ID)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Car;
