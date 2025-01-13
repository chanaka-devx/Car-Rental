import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
//import Navbar from './Components/Navbar.jsx';
//import SignUp from './Pages/SignUp.jsx';
import Register from './Pages/Register.jsx';
import Home from './Pages/Home.jsx'
//import Footer from './Components/Footer.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Car from './Pages/Car.jsx';
import CreateCar from './Pages/CreateCar.jsx';
import UpdateCar from './Pages/UpdateCar.jsx';
import Login from './Pages/Login.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import Profile from './Pages/Profile.jsx';
import Dashboard from './Pages/Dashboard.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element ={<Home/>}/>
          <Route path='/register' element ={<Register/>}/>
          <Route path='/login' element ={<Login/>}/>
          <Route path='/car' element ={<Car/>}/>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path='/create' element ={<CreateCar/>}/>
          <Route path='/update/:id' element ={<UpdateCar/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
