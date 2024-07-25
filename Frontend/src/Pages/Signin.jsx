import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Paper,
   
} from '@mui/material';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../context/AuthContext';
const SignupForm = () => {
    let history = useNavigate();
    const { register } = useAuth()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setError('');
        try {
            const response = await register(formData)
            if (response) {
                return history("/");
            }
            //   setSnackbar({ open: true, message: 'Password changed successfully!' });
        } catch (error) {
            console.log(error)
            //   setSnackbar({ open: true, message: error.response?.data?.message || 'An error occurred' });
        }
    };

    return (
        <>
            <Navbar />
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5" sx={{ color: '#4285F4', mb: 3 }}>
                        Signup
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="given-name"
                            autoFocus
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: '#4285F4' }}
                        >
                            Signup
                        </Button>
                        <Box sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
                            <Typography variant="body2">
                                Already have an account?{' '}
                                <Link to="/"  sx={{ color: '#4285F4' }}>
                                    Login
                                </Link>
                            </Typography>
                        </Box>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            sx={{ mt: 1, borderColor: '#4285F4', color: '#4285F4' }}
                        >
                            Signup with Google
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default SignupForm;