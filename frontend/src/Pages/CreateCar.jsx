import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer.jsx';
import './CreateCar.css';

const CreateCar = () => {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [vnumber, setVnumber] = useState('');
    const [color, setColor] = useState('');
    const [yom, setYom] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/create', { brand, model, vnumber, color, yom })
            .then(res => {
                console.log('Response from server:', res.data);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <Navbar />
            <div className="create-car-container">
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <h2 className="form-title">Add Car</h2>

                        <div className="form-group">
                            <label htmlFor="brand">Brand</label>
                            <input
                                type="text"
                                id="brand"
                                placeholder="Enter Brand"
                                onChange={e => setBrand(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="model">Model</label>
                            <input
                                type="text"
                                id="model"
                                placeholder="Enter Model"
                                onChange={e => setModel(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="vnumber">Vehicle Number</label>
                            <input
                                type="text"
                                id="vnumber"
                                placeholder="Enter Vehicle Number"
                                onChange={e => setVnumber(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="color">Color</label>
                            <input
                                type="text"
                                id="color"
                                placeholder="Enter Color"
                                onChange={e => setColor(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="yom">Year of Manufacture (YOM)</label>
                            <input
                                type="text"
                                id="yom"
                                placeholder="Enter Year of Manufacture"
                                onChange={e => setYom(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Add
                        </button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default CreateCar;
