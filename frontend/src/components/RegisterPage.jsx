import React, { useState } from "react";
import '../components/css/RegisterPage.css';
import Navbar from "./Navbar";

const RegisterPage = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the preview image
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  return (
    <>
    <Navbar/>
    <div className="register-container">
      <div className="register-content">
        <div className="register-card">
          <div className="header">
            {/* Optional header if you need */}
          </div>

          <h1 className="register-heading">Create New Account</h1>
          <p className="register-link">
            Already Registered? <a href="/login">Login</a>
          </p>

          <form>
            <div className="form-group">
              <label htmlFor="name">NAME</label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                placeholder="hello@reallygreatsite.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                placeholder="********"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="grade-level">CURRENT YEAR / GRADE LEVEL</label>
              <input
                type="text"
                id="grade-level"
                placeholder="Grade 12"
                className="form-input"
              />
            </div>

            <button type="submit" className="register-button">
              Sign Up
            </button>
          </form>

       
        </div>

        {/* Image upload section outside register card */}
        <div className="image-upload-container">
          <div className="form-group image-upload">
            <label htmlFor="profile-image">Profile Picture</label>
            <div className="image-preview-container">
              {image ? (
                <img src={image} alt="Profile Preview" className="image-preview" />
              ) : (
                <div className="image-placeholder">No Image Selected</div>
              )}
            </div>
            <input
              type="file"
              id="profile-image"
              onChange={handleImageChange}
              className="form-input"
              accept="image/*"
            />
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default RegisterPage;
