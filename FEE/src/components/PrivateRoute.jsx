import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('user'); // same 'user' key as Login.js and NavBar.js

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
