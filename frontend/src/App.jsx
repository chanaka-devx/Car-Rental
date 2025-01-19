import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import Register from './Pages/Register.jsx';
import Home from './Pages/Home.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Car from './Pages/Car.jsx';
import CreateCar from './Pages/CreateCar.jsx';
import UpdateCar from './Pages/UpdateCar.jsx';
import Login from './Pages/Login.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import Profile from './Pages/Profile.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import About from './Pages/About.jsx';
import Privacy from './Pages/Privacy.jsx';
import Terms from './Pages/Terms.jsx';
import Booking from './Pages/Booking.jsx';
import Appoinments from './Pages/Appoinments.jsx';
import AdminDashboard from './Pages/AdminDashboard.jsx';
import FAQ from './Pages/FAQ.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element ={<Home/>}/>
          <Route path='/register' element ={<Register/>}/>
          <Route path='/login' element ={<Login/>}/>
          <Route path='/car' element ={<Car/>}/>
          <Route path='/about' element ={<About/>}/>
          <Route path='/privacy' element ={<Privacy/>}/>
          <Route path='/faq' element ={<FAQ/>}/>
          <Route path='/terms&conditions' element ={<Terms/>}/>
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
          <Route
            path="/booking/:carId"
            element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            }
          />
          <Route
            path="/appoinments"
            element={
              <PrivateRoute>
                <Appoinments/>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
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
