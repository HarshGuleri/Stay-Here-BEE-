import React from 'react';
import './login.css'; 

import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='body'>
      {/* <header>
        <h1>Stay ~Here</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">
              <button className="login_btn">Log In</button>
            </Link></li>
          </ul>
        </nav>
      </header> */}

      <section class="sectiona">
        <div class="text-login-container">
            
            <div class="text-3">
                <p>Login and Unlock more Features in <span ><b>Stay ~ Here..</b></span></p>
                <h1 >Get Discount</h1>
                <p>Simply sign into your stay~here account<br/> and take benefits.</p>
            </div>

            <div class="login-container">
                <h1>Login</h1>
                <form class="login-form">
                    <p>Enter your e-mail and password below to log in to your account and use the benefits of our website.</p>
                    <input type="text" placeholder="email address or phone number" required/>
                    <input type="password" placeholder="Password" required/>
                    <a href="/" class="forgot-password-link">Forgot Password?</a>
                    
                    <button type="submit">Login</button>
                  
                </form>
                <Link to="/register" className="linkB">Don't have an account? <span  className = "signup">Signup!</span></Link>
            </div>
        </div>
    </section>
    </div>
  );
}

export default Login;


