import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; 
import Login from './components/LoginPage'; 
import Register from './components/RegisterPage'; 
import UserProfile from './components/UserProfile';
import About from './components/About';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* Include Navbar, it will show only on /login */}
      
        
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
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
