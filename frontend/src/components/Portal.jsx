import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import styles
import Nav2 from "./Nav2";
import Footer from "./Footer";
import "../components/css/Portal.css";
import shsImg from "../assets/shs.png";
import collegeImg from "../assets/college.png";
import careerImg from "../assets/career.png";

const Portal = () => {
  const [gradeLevel, setGradeLevel] = useState("");

  useEffect(() => {
    // Retrieve user object from localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser); // Parse JSON
        setGradeLevel(parsedUser.gradeLevel || ""); // Set grade level
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handlePortalClick = (portalType) => {
    if (portalType === "shs" && (gradeLevel === "Senior High School" || gradeLevel === "College")) {
      toast.error("🚫 You cannot access the Senior High School portal.");
      return;
    }
    if (portalType === "college" && gradeLevel === "College") {
      toast.error("🚫 You cannot access the College portal.");
      return;
    }
    window.location.href = "/documents"; // Redirect if allowed
  };

  return (
    <>
      <Nav2 />
      <div className="portal-container">
        <h1>Portal</h1>
        <div className="portal-grid">
          {/* Senior High School Portal */}
          <div className="portal">
            <h2>For Incoming Senior HighSchool</h2>
            <img src={shsImg} alt="Select Portal" />
            <button 
              className="portal-btn" 
              onClick={() => handlePortalClick("shs")}
            >
              Predict Your Strand
            </button>
          </div>

          {/* College Portal */}
          <div className="portal">
            <h2>For Incoming College</h2>
            <img src={collegeImg} alt="Upload Grades" />
            <button 
              className="portal-btn" 
              onClick={() => handlePortalClick("college")}
            >
              Predict Your Course
            </button>
          </div>

          {/* Career Portal (Always Enabled) */}
          <div className="portal">
            <h2>For Your Future Career</h2>
            <img src={careerImg} alt="Upload Certificates" />
            <button 
              className="portal-btn" 
              onClick={() => window.location.href = "/documents"}
            >
              Predict Your Career
            </button>
          </div>
        </div>
      </div>
      
      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Footer />
    </>
  );
};

export default Portal;
