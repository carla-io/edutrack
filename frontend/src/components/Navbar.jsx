import React, { useState } from 'react';
import { FaBars, FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../components/css/Navbar.css';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
