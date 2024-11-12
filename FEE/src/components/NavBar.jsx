import React, { useState } from 'react';  // Removed unused React2 import
import { Link } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <nav>
                <div className="navbar_01">
                    {/* Logo */}
                    <img className="logo" src="favicon1.ico" alt="logo" />

                    {/* Menu icon visible only on smaller screens */}
                    <div className="menu-icon" onClick={toggleMenu}>
                        &#9776;  {/* Hamburger Icon */}
                    </div>

                    {/* Links */}
                    <div>
                        <ul className={`all-links ${isMenuOpen ? 'show' : ''}`}>
                            <li className="nav-item">
                                <Link to="/" className="nav-link active">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/About" className="nav-link active">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/services" className="nav-link active">Services</Link>
                            </li>
                            <div className="nav-button">
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
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;
