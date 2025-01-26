import React from "react";
import { FaAddressCard } from "react-icons/fa6";  // Import the address card icon
import '../components/css/LoginPage.css';
import Navbar from "./Navbar";

const LoginPage = () => {
  return (
    <>
    <Navbar/>
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="header">
            <h1 className="login-heading">LOGIN</h1>
          </div>

          <p className="register-link">
            New to this Site? <a href="/register">Register</a>
          </p>

          <form>
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

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>

        {/* Address Card Icon */}
        <div className="address-icon-container">
          <FaAddressCard className="address-icon" />
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
