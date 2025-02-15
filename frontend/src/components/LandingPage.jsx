import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/css/LandingPage.css";
import { FaBookOpen } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { FaGraduationCap, FaLaptop } from "react-icons/fa";

function LandingPage() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/login");
  };

  return (
    <div className="landing-container">
      <div className="header-section">
        <FaBookOpen className="open-book-icon" />
        <h1 className="main-title">
          Welcome to <span className="highlight">EDUTRACKER</span>
        </h1>
        <p className="tagline">Your Smart Pathway to Success, Plan and Excel!</p>
        <h3 className="year-text">EDUTRACKER @ 2025</h3>
      </div>

      {/* Feature Sections */}
      <div className="features-container">
        <div className="feature-box">
          <MdQuiz className="feature-icon" />
          <h2 className="feature-title">Take the Quiz</h2>
          <p className="feature-text">
            Be yourself and answer honestly to get the best recommendation for your academic or career path.
          </p>
        </div>

        <div className="feature-box">
          <FaGraduationCap className="feature-icon" />
          <h2 className="feature-title">Get Your Results</h2>
          <p className="feature-text">
            Discover the SHS strand, college course, or career options that match your interests and skills.
          </p>
        </div>

        <div className="feature-box">
          <FaLaptop className="feature-icon" />
          <h2 className="feature-title">Plan Your Future</h2>
          <p className="feature-text">
            Use your results to explore schools, scholarships, and career opportunities that fit your potential.
          </p>
        </div>
      </div>

      {/* Start Button */}
      <button className="start-button" onClick={handleStartClick}>
        Start Your Journey!
      </button>
    </div>
  );
}

export default LandingPage;
