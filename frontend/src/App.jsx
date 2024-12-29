import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import Navbar from './Components/Navbar.jsx';
import SignUp from './Pages/SignUp.jsx';
import Home from './Pages/Home.jsx'
import Footer from './Components/Footer.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Student from './Pages/Student.jsx';
import CreateStudent from './Pages/CreateStudent.jsx';
import UpdateStudent from './Pages/UpdateStudent.jsx';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element ={<Home/>}/>
          <Route path='/signup' element ={<SignUp/>}/>
          <Route path='/login' element ={<Login/>}/>
          <Route path='/create' element ={<CreateStudent/>}/>
          <Route path='/update/:id' element ={<UpdateStudent/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
