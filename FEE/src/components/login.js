// frontend/src/components/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // React Router hook to navigate to other pages

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });
  
      if (response.data.token) {
        setIsAuthenticated(true);
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error.response || error);
      alert('Invalid credentials');
    }
  };
  

  return (
    <div className='body'>
      <section className="sectiona">
        <div className="text-login-container">
          <div className="text-3">
            <p>Login and Unlock more Features in <span><b>Stay ~ Here..</b></span></p>
            <h1>Get Discount</h1>
            <p>Simply sign into your stay~here account<br /> and take benefits.</p>
          </div>

          <div className="login-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleLogin}>
              <p>Enter your e-mail and password below to log in to your account and use the benefits of our website.</p>
              <input 
                type="text" 
                placeholder="email address or phone number" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="Password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="/" className="forgot-password-link">Forgot Password?</a>

              <button type="submit">Login</button>
            </form>
            <Link to="/register" className="linkB">Don't have an account? <span className="signup">Signup!</span></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
