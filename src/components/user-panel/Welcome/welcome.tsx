import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { Box, Typography, Button, Container } from "@mui/material";
import "./welcome.css"; // Import the updated CSS file

export const Welcome = () => {
    useEffect(() => {
        confetti({
            particleCount: 1000,
            spread: 70,
            origin: { y: 0.6 },
            startVelocity: 60,
            gravity: 1.5,
            ticks: 100,
        });
    }, []);

    return (
        <Container component="main" maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <img
                    src="https://img.clipart-library.com/2/clip-transparent-confetti-gif/clip-transparent-confetti-gif-16.gif"
                    alt="Welcome"
                    className="welcome-gif"
                    style={{ width: '100%', maxWidth: '600px', borderRadius: '8px', marginBottom: '20px' }}
                />
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, pointerEvents: 'none' }}>
                    <Typography variant="h4" className="text-success" sx={{ zIndex: 2 }}>
                        Welcome to the Expense Tracker
                    </Typography>
                </Box>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
                Manage your finances effortlessly with our simple and intuitive tool.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                Track your expenses, set budgets, and stay in control of your money—all in one place.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                Let’s make managing your finances easy!
            </Typography>
            <Button variant="contained" color="primary" size="large" href="/user/dashboard">
                Get Started
            </Button>
        </Container>
    );
};
