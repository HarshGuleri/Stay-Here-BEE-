import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';
import NavBar from './NavBar';

const RegisterForm = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [agreeTerms, setAgreeTerms] = React.useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('https://stay-here-bee.onrender.com/auth/register', {
        name, 
        email, 
        password
      });

      if (response.status === 201) {
        alert('User  registered successfully');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error.response || error);
      alert(error.response?.data?.message || 'Error registering user');
    }
  };

  return (
    <>
  
    <div className="container5_1"> {/* Ensure this class matches your responsive design */}
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
        </form>
      </div>
    </div>
    </>
    
  );
};

export default RegisterForm;