import React, { useState, useEffect } from 'react';
import { FaBars, FaBookOpen } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../components/css/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('auth-token');
    setIsLoggedIn(!!token); // If token exists, set isLoggedIn to true
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    // Clear token and user data
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');

    // Update state to reflect logout
    setIsLoggedIn(false);

    // Redirect to login page
    navigate('/login');
  };

  return (
    <>
      {/* Top Navbar */}
     <header className="top-navbar2">
            <div className="navbar2-content">
              <div className="hamburger2" onClick={toggleMenu}>
                <FaBars size={24} />
              </div>
              <div className="navbar2-logo">
                <FaBookOpen className="navbar2-icon" />
                <span className="navbar2-title">EDUTRACKER</span>
              </div>
           

          {/* Show Logout button only if logged in */}
          <div className="logout-container">
                    {isLoggedIn ? (
                      <button className="logout-button" onClick={handleLogout}>Logout</button>
                    ) : (
                      <Link to="/login" className="nav2-link">Login</Link>
                    )}
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
