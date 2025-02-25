import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage'; 
import Login from './components/LoginPage'; 
import Register from './components/RegisterPage'; 
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Portal from './components/Portal';
import Documents from './components/Documents';
import PQ from './components/PQ';
import PQ2 from './components/PQ2';
import PQ3 from './components/PQ3';
import Exam from './components/Exam';
import Results from './components/Results';
import AdminDashboard from './components/admin/Dashboard';
import ProtectedRoute from './ProtectedRoutes';
import AdminUsers from './components/admin/ManageUsers';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import CareerPaths from './components/Career';
import Stem from './components/Stem';
import CollegeCourses from './components/Courses';
import Contact from './components/Contact';

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
          <Route path="/home" element={<Home />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/personal-question" element={<PQ />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/results" element={<Results />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/PQ" element={<PQ />} />
          <Route path="/PQ2" element={<PQ2 />} />
          <Route path="/PQ3" element={<PQ3 />} />
          <Route path="/Career" element={<CareerPaths />} />
          <Route path="/Stem" element={<Stem />} />
          <Route path="/courses" element={<CollegeCourses />} />
          <Route path="/contact" element={<Contact />} />
          
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
