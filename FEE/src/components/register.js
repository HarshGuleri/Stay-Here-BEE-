import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    if (!agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        name, 
        email, 
        password
      });
  
      if (response.status === 201) {
        alert('User registered successfully');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error.response || error);
      const errorMessage = error.response?.data?.message || 'Error registering user';
      alert(errorMessage);
    }
  };
  

  return (
    <div className='regi'>
      <section className="section5">
        <img src="https://cdn.pixabay.com/photo/2017/06/04/23/17/lighthouse-2372461_1280.jpg" alt="background"/>
      </section>
      <section className="container5_1">
        <div className="upper">
          <h1>CREATE ACCOUNT</h1>
          <hr />
        </div>
        <div className='container5_2'>
          <form className="form2" onSubmit={handleRegister}>
            <input 
              id="in" 
              type="text" 
              placeholder="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <input 
              id="in" 
              type="email" 
              placeholder="Your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              id="in" 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <input 
              id="in" 
              type="password" 
              placeholder="Confirm password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
            <label className="check-1">
              <input 
                type="checkbox" 
                className="agreeCheckbox" 
                checked={agreeTerms} 
                onChange={(e) => setAgreeTerms(e.target.checked)} 
              />
              <p>I agree to the terms and conditions</p>
            </label>
            <button className="signup1" type="submit" disabled={!agreeTerms}>
              REGISTER
            </button>
            <a href="/login" className="signin-link">Already have an account? <span>Sign In!</span></a>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;
