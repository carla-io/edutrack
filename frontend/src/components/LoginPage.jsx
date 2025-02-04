import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../components/css/LoginPage.css";
import { FaAddressCard } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      const { token, user } = response.data; // Assuming the response returns a token and user info
  
      // Store token and user info in localStorage
      localStorage.setItem("auth-token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      console.log("Login successful:", response.data);
  
      // Display success toast
      toast.success("Login successful!", { position: "top-right", autoClose: 3000 });

      // Redirect to user profile
      navigate("/user-profile");
  
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      
      // Display error toast
      toast.error(error.response?.data?.message || "Login failed! Please try again.", {
        position: "top-right",
        autoClose: 3000
      });
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-card">
            <div className="header">
              <h1 className="login-heading">LOGIN</h1>
            </div>

            <p className="register-link">
              New to this Site? <a href="/register">Register</a>
            </p>

            <form onSubmit={handleSubmit}>
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

              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>

          <div className="address-icon-container">
            <FaAddressCard className="address-icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
