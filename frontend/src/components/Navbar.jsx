import React, { useState } from 'react';
import { FaBars, FaBookOpen } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Change from useHistory to useNavigate
import '../components/css/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();  // useNavigate instead of useHistory

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    // Clear token and user data from localStorage or sessionStorage
    localStorage.removeItem('auth-token');
        localStorage.removeItem('user'); // If stored in sessionStorage, clear that too

    // Optionally, you can clear other user-related data like profile info or user state

    // Redirect to the login page after logging out
    navigate('/login');  // use navigate instead of history.push
  };

  return (
    <>
      {/* Top Navbar */}
      <header className="top-navbar">
        <div className="navbar-content">
          <div className="hamburger" onClick={toggleMenu}>
            <FaBars size={24} />
          </div>
          <div className="navbar-logo">
            <FaBookOpen className="navbar-icon" />
            <span className="navbar-title">EDUTRACKER</span>
          </div>

          {/* Logout Button on the right */}
          <div className="logout-container">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <nav className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/About" className="nav-link">About</Link>
          </li>

          <li className="nav-item">
            <Link to="/user-profile" className="nav-link">User Profile</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
