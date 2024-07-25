
// import { useState, useEffect } from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Signin from './Pages/Signin';
import ProtectedRoute from '../src/components/ProtectedRoute';
import Cookies from 'js-cookie';
function App() {
  const isLoggedIn = Cookies.get('Token')
  
  return (
    <>
      <Router>
        <div className='App'>
        <AuthProvider>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          
            <Route  path="/"  element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
            <Route exact path="/register"  element={<Signin/>} />
          </Routes>
        </AuthProvider>
        </div>
      </Router>
    </>
  )
}

export default App
