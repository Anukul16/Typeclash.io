import React, { useState } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container login_container">
      <div id="loginForm">
        <div className="page_title">Sign Up</div>
        <form className="validated_form">
          <div className="form_section">
            <label htmlFor="username">Username</label>
            <input type="text" id="email" name="email" required autoComplete="off" />
          </div>
          <div className="form_section">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required autoComplete="off" />
          </div>
          <div className="form_section">
            <label htmlFor="password">Password</label>
            <span className="password_input_container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                required
              />
              <span className="toggle_password_icon" onClick={togglePasswordVisibility}>
                {passwordVisible ? (
                  <VisibilityIcon className="vis_icon" />
                ) : (
                  <VisibilityOffIcon className="vis_icon" />
                )}
              </span>
            </span>
          </div>
          <button type="submit" className="button_highlight">
            Sign Up
          </button>
        </form>
        <p className="dark_text center">
          Already have an account? &nbsp;
          <Link to="/login" className="sign_up auth_classes">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
