import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook
import '../components/css/LandingPage.css';
import { FaBookOpen, FaUser } from "react-icons/fa"; 

function LandingPage() {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleStartClick = () => {
      navigate('/login'); // Navigate to the login page
    };
    
    return (
        <div className="landing-container">
          <div className="content">
            <div className="title-container">
              <FaBookOpen className="open-book-icon" />
              <div className="title-text">
                <h1 className="heading">WELCOME TO</h1>
                <h2 className="heading">EDUTRACKER</h2>
              </div>
            </div>
            <p className="tagline">
              "EduTrack: Your Smart Pathway to Success - Predict, Plan, and Excel!"
            </p>
            <div className="button-container">
              <FaUser className="user-icon-left" />
              <button className="start-button" onClick={handleStartClick}>
                START
              </button>
            </div>
            <p className="journey-text">Start Your Journey now!</p>
          </div>
        </div>
    );
}

export default LandingPage;
