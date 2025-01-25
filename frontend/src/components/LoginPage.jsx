import React from "react";
import { FaRegIdBadge } from "react-icons/fa";
import '../components/css/LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="header">
         
        </div>

        <h1 className="login-heading">LOGIN</h1>
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

        <div className="icon-container">
          <FaRegIdBadge className="login-icon" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
