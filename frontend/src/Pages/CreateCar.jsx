import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer.jsx";
import "./CreateCar.css";
import { useNavigate } from "react-router-dom";

const CreateCar = () => {
    const [imagePreview, setImagePreview] = useState(null); // State for previewing the image

    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target); // Automatically gets all form fields

        try {
            const response = await fetch("http://localhost:5176/create", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log(result);

            if (result.success) {
                alert("Car uploaded successfully!");
                navigate("/car");
            } else {
                alert("Error: " + result.message);
            }
        } catch (err) {
            console.error("Error uploading car:", err);
            alert("An error red while uploading the car.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="create-car-container">
                <div className="form-container">
                    <form id="carForm" onSubmit={handleFormSubmit} encType="multipart/form-data">
                        <h2 className="form-title">Add Car</h2>

                        <div className="form-group">
                            <label htmlFor="brand">Brand</label>
                            <input
                                type="text"
                                id="brand"
                                name="brand"
                                placeholder="Enter Brand"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="model">Model</label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                placeholder="Enter Model"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="vnumber">Vehicle Number</label>
                            <input
                                type="text"
                                id="vnumber"
                                name="vnumber"
                                placeholder="Enter Vehicle Number"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="color">Color</label>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                placeholder="Enter Color"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="yom">Location</label>
                            <input
                                type="location"
                                id="location"
                                name="location"
                                placeholder="Enter Location"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="yom">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Enter Price"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">Car Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange} // Use handler for preview
                                required
                            />
                            {imagePreview && (
                                <div className="image-preview-container">
                                    <img
                                        src={imagePreview}
                                        alt="Car Preview"
                                        className="image-preview"
                                    />
                                </div>
                            )}
                        </div>

                        <button type="submit" className="submit-button">
                            Add
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CreateCar;
