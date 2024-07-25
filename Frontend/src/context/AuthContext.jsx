// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { config } from '../constant'
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
const url = config.url.API_URL
let history = useNavigate();
const [user, setUser] = useState(null);
const [token, setToken ] =  useState(Cookies.get('Token')); 
const [isAuth,setAuth]  =  useState(Cookies.get('isAuth'));
const [userId,setuserId]  =  useState(Cookies.get('userId'));



  const login = async (email, password) => {
    try {
      const response = await axios.post(`${url}/api/users/login`, { email, password });
      const { userId,token } = response.data;
      // console.log(response.data)
      Cookies.set("Token", token);
      Cookies.set("isAuth", true)
      Cookies.set("userId", userId);
      // console.log(user);
      // The token should be set as an HTTP-only cookie by the server
      setUser(userId);
      setToken(token);
      setAuth(true)
      return true;
    } catch (error) {
      throw error;
    }
  };

  const register = async (formData) => {
    const { firstName, lastName, email, password } = formData;
    try {
      const response = await axios.post(`${url}/api/users/register`,  {firstName,lastName, email, password });
      console.log("regiter",response)
      return true;
    //   setSnackbar({ open: true, message: 'Password changed successfully!' });
    } catch (error) {
        console.log(error)
        throw error;
    //   setSnackbar({ open: true, message: error.response?.data?.message || 'An error occurred' });
    } 
  }
 

  const logout = () => {
    Cookies.remove('isAuth');
    Cookies.remove('Token');
    history('/')


  }

  return (
    <AuthContext.Provider value={{ userId, login, logout,token, isAuth,register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);