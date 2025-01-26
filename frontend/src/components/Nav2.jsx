import React, { useState } from 'react';
import { FaBars, FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../components/css/Nav2.css';


function Nav2() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Top nav2bar */}
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
      </header>

      {/* sidebar2 */}
      <nav2 className={`sidebar2 ${isOpen ? 'expanded' : 'collapsed'}`}>
        <ul className="nav2-list">
          <li className="nav2-item">
            <Link to="/" className="nav2-link">Home</Link>
          </li>
          <li className="nav2-item">
            <Link to="/login" className="nav2-link">Login</Link>
          </li>
          <li className="nav2-item">
            <Link to="/About" className="nav2-link">About</Link>
          </li>

          <li className="nav2-item">
            <Link to="/user-profile" className="nav2-link">User Profile</Link>
          </li>
        </ul>
      </nav2>
    </>
  );
}

export default Nav2;
