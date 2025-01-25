import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Import LandingPage component
import Login from './components/LoginPage'; // Import LoginSignup component
import Navbar from './components/Navbar'; // Import Navbar component
import Register from './components/RegisterPage'; // Import Register component
import UserProfile from './components/UserProfile';
import About from './components/About';

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* Include Navbar, it will show only on /login */}
        <Navbar />
        
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Login Page Route */}
          <Route path='/login' element={<Login />} />

          <Route path='/register' element={<Register />} />

          <Route path='/user-profile' element={<UserProfile />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
