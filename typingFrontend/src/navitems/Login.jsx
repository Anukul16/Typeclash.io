import React, { useState } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      const data = await response.json()
      // console.log(data.token+" "+data.message);
      // localStorage.clear()
      localStorage.setItem('logintoken', data.token)
      localStorage.setItem('username',data.username)
      navigate("/account")
      // console.log(data.message);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="container login_container">
      <div id="loginForm">
        <div className="page_title">Log In</div>
        <form className="validated_form">
          <div className="form_section">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              required
              autoComplete="off"
              onChange={(e) =>{ 
                console.log(e.target.value);
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className="form_section">
            <label htmlFor="password">Password</label>
            <span className="password_input_container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                required
                onChange={(e) => {
                  console.log(e.target.value);
                  setPassword(e.target.value)
                }}
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
          <button
            type="submit"
            className="button_highlight"
            onClick={handleLogin}

          >
            Log In
          </button>
        </form>
        <p className="dark_text center">
          Forgot your password? &nbsp;
          <Link to="/reset-password" className="reset_password auth_classes">
            Reset your password
          </Link>
        </p>
        <p className="dark_text center">
          Don't have an account? &nbsp;
          <Link to="/signup" className="sign_up auth_classes">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
