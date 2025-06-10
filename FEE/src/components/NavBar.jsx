import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const auth = localStorage.getItem('user'); // Use 'user' token key same as Login.js

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <nav>
            <div className=" navbar navbar-expand-lg navbar_01">
                <h2 className='logo-h1'>Stay ~Here</h2>
                

                <div className="menu-icon" onClick={toggleMenu}>
                    &#9776;
                </div>

                <ul className={`all-links ${isMenuOpen ? 'show' : ''}`}>
                    <li className="nav-item">
                        <Link to="/" className="nav-link active">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link active">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/services" className="nav-link active">Services</Link>
                    </li>

                    {auth ? (

                        <li>
                            <div class="dropdown">
                                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    My Profile
                                </a>

                                <ul class="dropdown-menu">
                                    <li><a  class="dropdown-item" href="#">View</a></li>
                                    <li><a onClick={logout} class="dropdown-item" href="#">Logout</a></li>
                                    
                                </ul>
                            </div>
                        </li>
                        // 
                    ) : (
                        <>
                            <li className='btna'>
                                <Link to="/login">
                                    <button className="login_btn">Log in</button>
                                </Link>
                            </li>
                            <li className='btna'>
                                <Link to="/register">
                                    <button className="register0">Register</button>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>

 
    );
};

export default NavBar;
