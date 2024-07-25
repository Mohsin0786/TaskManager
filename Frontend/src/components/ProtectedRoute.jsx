import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuth } = useAuth()
    console.log("Auth",isAuth)
  return isAuth ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;