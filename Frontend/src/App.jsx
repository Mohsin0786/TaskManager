
// import { useState, useEffect } from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Signin from './Pages/Signin';
import ProtectedRoute from '../src/components/ProtectedRoute';

function App() {
  
  
  return (
    <>
      <Router>
        <div className='App'>

        <AuthProvider>
          <Routes>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            {/* <Route exact path="/dashboard" element={<Dashboard/>} /> */}
            <Route exact path="/"  element={<Login/>} />
            <Route exact path="/register"  element={<Signin/>} />
          </Routes>
        </AuthProvider>
        </div>
      </Router>
    </>
  )
}

export default App
