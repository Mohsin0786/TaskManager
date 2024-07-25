import React from 'react'
import {
    AppBar,
    Toolbar,
    IconButton, Box, Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from "react-router-dom";
export default function Navbar({ isAuth }) {

    const { logout } = useAuth()
    let location = useLocation();
    console.log("location", location);
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                {isAuth && <Button color="inherit" onClick={() => logout()}>Logout</Button>}
                {!isAuth && (<>
                    <Link to="/" style={{
                        color: 'blue',
                        textDecoration: 'none'
                    }}><Button sx={{
                        
                        backgroundColor: location.pathname === "/" ? "white" : "inherit",
                        color:location.pathname === "/" ? "#1976d2":"white",
                        '&:hover': {
                            backgroundColor:  location.pathname === "/" ? "white" : "inherit",
                        }
                    }}>Login</Button></Link>
                    <Link to="/register" ><Button  sx={{
                        color:location.pathname === "/register" ? "#1976d2":"white",
                        backgroundColor: location.pathname === "/register" ? "white" : "inherit",
                        '&:hover': {
                            backgroundColor:  location.pathname === "/register" ? "white" : "inherit",


                        }
                    }}>Signup</Button></Link></>)}
            </Toolbar>
        </AppBar>
    )
}

