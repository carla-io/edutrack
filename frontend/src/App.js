import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; 
import Login from './components/LoginPage'; 
import Register from './components/RegisterPage'; 
import UserProfile from './components/UserProfile';
import About from './components/About';
import Dashboard from './components/Dashboard';
import Portal from './components/Portal';
import Documents from './components/Documents';
import PQ from './components/PQ';
import Exam from './components/Exam';
import Results from './components/Results';

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

          <Route path='/portal' element={<Portal />} />
          <Route path='/documents' element={<Documents />} />

          <Route path='/personal-question' element={<PQ />} />
          <Route path='/exam' element={<Exam/>} />
          <Route path='/results' element={<Results/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
