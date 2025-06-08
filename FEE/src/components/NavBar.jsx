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
            <div className="navbar_01">
                <img className="logo" src="favicon1.ico" alt="logo" />

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
                        <li className="nav-item">
                            <button onClick={logout} className="logout_btn">Logout</button>
                        </li>
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
