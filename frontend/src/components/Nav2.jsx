import React, { useState, useEffect } from 'react';
import { FaBars, FaBookOpen } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../components/css/Nav2.css';

function Nav2() {
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
        </div>

        {/* Show Logout button if logged in, otherwise show Login */}
        <div className="logout-container">
          {isLoggedIn ? (
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login" className="nav2-link">Login</Link>
          )}
        </div>
      </header>

      {/* Sidebar */}
      <nav className={`sidebar2 ${isOpen ? 'expanded' : 'collapsed'}`}>
        <ul className="nav2-list">
          <li className="nav2-item">
            <Link to="/dashboard" className="nav2-link">Home</Link>
          </li>

          {!isLoggedIn && (
            <li className="nav2-item">
              <Link to="/login" className="nav2-link">Login</Link>
            </li>
          )}

          {/* Hide User Profile link if not logged in */}
          {isLoggedIn && (
            <li className="nav2-item">
              <Link to="/user-profile" className="nav2-link">User Profile</Link>
            </li>
          )}

          <li className="nav2-item">
            <Link to="/About" className="nav2-link">About Us</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav2;
