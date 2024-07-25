import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
} from "@mui/material";
import { useAuth } from '../context/AuthContext';
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
const Login = () => {

    const { login } = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res  = await login(email, password);
          console.log(res)
          if (res) {
            return history("/dashboard");
          }
          // Redirect or update UI as needed
        } catch (err) {
          setError('Login failed. Please check your credentials.');
        }
      };

    return (
        <>
        <Navbar />
            <Container maxWidth="sm">
                <Box sx={{ flexGrow: 1 }}>
                    <Container component="main" maxWidth="xs">
                        <Box
                            sx={{
                                marginTop: 8,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                                Login
                            </Typography>
                            {error && (
                                <Typography color="error" sx={{ mb: 3 }}>
                                    {error}
                                </Typography>
                            )}
                            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Login
                                </Button>
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography variant="body2">
                                        Don't have an account?
                                        <Link to="/register"  sx={{ color: '#4285F4' }}>
                                    Signin
                                </Link>
                                    </Typography>
                                    <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                                        Login with Google
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Container>
        </>
    );
};

export default Login;
