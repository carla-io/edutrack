import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/css/RegisterPage.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gradeLevel: ""
  });

  const navigate = useNavigate();
  const gradeLevels = ["Junior High School", "Senior High School", "College"];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("gradeLevel", formData.gradeLevel);
    if (image) {
      data.append("profilePicture", image);
    }

    try {
      const response = await axios.post("http://localhost:4000/api/auth/register", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      const { token, user } = response.data; // Assuming API returns a token and user info

      // Store token and user info in localStorage
      localStorage.setItem("auth-token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Registration successful!", { position: "top-right", autoClose: 3000 });

      console.log("Registration successful:", response.data);

      // Redirect to user profile
      navigate("/user-profile");

    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Registration failed! Please try again.", {
        position: "top-right",
        autoClose: 3000
      });
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="register-container">
        <div className="register-content">
          <div className="register-card">
            <h1 className="register-heading">Create New Account</h1>
            <p className="register-link">
              Already Registered? <a href="/login">Login</a>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">NAME</label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  placeholder="hello@reallygreatsite.com"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">PASSWORD</label>
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="gradeLevel">CURRENT YEAR / GRADE LEVEL</label>
                <select
                  id="gradeLevel"
                  className="form-input"
                  value={formData.gradeLevel}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Grade Level</option>
                  {gradeLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="register-button">
                Sign Up
              </button>
            </form>
          </div>

          <div className="image-upload-container">
            <div className="form-group image-upload">
              <label htmlFor="profile-image">Profile Picture</label>
              <div className="image-preview-container">
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="Profile Preview" className="image-preview" />
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
