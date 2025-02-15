import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import AdminDashboard from './components/admin/Dashboard';
import ProtectedRoute from './ProtectedRoutes';
import AdminUsers from './components/admin/ManageUsers';

function App() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message until role is set
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/personal-question" element={<PQ />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/results" element={<Results />} />
          
          {/* Protected Admin Route */}
          <Route path="/admin/dashboard" element={
          <ProtectedRoute role={role} allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

<Route path="/admin/users" element={
          <ProtectedRoute role={role} allowedRole="admin">
            <AdminUsers />
          </ProtectedRoute>
        } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
