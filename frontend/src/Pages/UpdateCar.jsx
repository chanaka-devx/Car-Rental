import React, { useState, useEffect  } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer.jsx";
import "./UpdateCar.css";

const UpdateCar = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [vnumber, setVnumber] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [car, setCar] = useState({});
  const { ID, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching car details for ID:", id);
    axios
      .get(`http://localhost:5176/car/${id}`)
      .then((res) => {
        console.log("Fetched Car Data:", res.data); // Log API response
        if (res.data) {
          setCar({
            brand: res.data.Brand,
            model: res.data.Model,
            vnumber: res.data.Number,
            color: res.data.Color,
            location: res.data.Location,
            price: res.data.Price,
          });
        }
      })
      .catch((err) => console.error("Error fetching car data:", err));
  }, [id]);
  
  console.log("Car ID received in UpdateCar:", id);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put("http://localhost:5176/update/" + id, {
        brand,
        model,
        vnumber,
        color,
        location,
        price,

      })
      .then((res) => {
        console.log("Response from server:", res.data);
        navigate("/car");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="update-car-container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2 className="form-title">Update Car</h2>

            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                name="brand"
                placeholder={car.brand}
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                id="model"
                placeholder={car.model}
                onChange={(e) => setModel(e.target.value)}
                value={model}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="vnumber">Vehicle Number</label>
              <input
                type="text"
                id="vnumber"
                placeholder={car.vnumber}
                onChange={(e) => setVnumber(e.target.value)}
                value={vnumber}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="color">Color</label>
              <input
                type="text"
                id="color"
                placeholder={car.color}
                onChange={(e) => setColor(e.target.value)}
                value={color}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="yom">Location</label>
              <input
                type="location"
                id="location"
                placeholder={car.location}
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="yom">Price</label>
              <input
                type="number"
                id="price"
                placeholder={car.price}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </div>


            <button type="submit" className="submit-button">
              Update
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateCar;
