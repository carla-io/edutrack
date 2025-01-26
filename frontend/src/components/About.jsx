import React from "react";
import "../components/css/About.css";
import Nav2 from "./Nav2";
import Footer from "./Footer";
import bookImage from "../assets/book.png"; // Ensure the correct path to your book image

const About = () => {
  return (
    <>
      <Nav2 />
      <div className="about-container">
        <div className="about-content">
          <div className="text-content">
            <h1>What is EDUTRACKER?</h1>
            <p>
              Welcome to EduTracker, your ultimate partner in shaping brighter futures! 
              We are a cutting-edge predictive analysis platform designed to empower students 
              in discovering their ideal strands, courses, and career paths. With innovative 
              features like results tracking, Gmail notifications, image processing for grades 
              and certificates, and engaging quizzes, we aim to simplify and enhance your 
              educational journey.
            </p>
            <p>
              At EduTrack, we believe every student deserves personalized guidance to unlock 
              their full potential. By combining technology with a passion for learning, 
              we help you make informed decisions and confidently navigate your path to success. 
              Your future starts here with EduTrack!
            </p>
          </div>

          <div className="image-container">
            <img src={bookImage} alt="Books" className="book-image" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
