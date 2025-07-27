import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Body from './components/Body';
import About from './components/About';
import Services from './components/services';
import Login from './components/login';
import Register from './components/register';
import RegisterForm from './components/RegisterForm';
import RoomDetails from './components/RoomDetails';
import Contact from './components/Contact';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import Profile from './components/Profile';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('user'));
    const [bookings, setBookings] = useState(() => {
        const saved = localStorage.getItem('bookings');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }, [bookings]);

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/rooms', {
                    mode: 'cors'
                });
                const data = await response.json();
                setRooms(data);
            } catch (err) {
                console.error('Failed to fetch rooms:', err);
            }
        };

        fetchRooms();
    }, []);

    return (
        <div className="App">
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Body rooms={rooms} />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/register-form" element={<RegisterForm />} />

                    {/* Protected Routes */}
                    <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
                    <Route path="/services" element={<PrivateRoute><Services /></PrivateRoute>} />
                    <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route
                        path="/room-details/:id"
                        element={
                            <PrivateRoute>
                                <RoomDetails items={rooms} />
                            </PrivateRoute>
                        }
                    />

                </Routes>
            </Router>
        </div>
    );
};

export default App;
