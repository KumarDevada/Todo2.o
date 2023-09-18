import { useState, useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './index.css'
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
// const API_BASE = 'https://mern-crud-app-a386.onrender.com';
// const API_BASE = 'http://localhost:3000';
const API_BASE = 'https://server-todo2-o.onrender.com'
function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  ); 
}




export default App;
