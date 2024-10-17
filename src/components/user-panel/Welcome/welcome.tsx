import React, { useEffect } from "react";
import confetti from 'canvas-confetti';

export const Welcome = () => {
    useEffect(() => {
        // Trigger the confetti animation on component load
        confetti({
            particleCount: 1000,
            spread: 70,
            origin: { y: 0.6 },
            startVelocity: 60,   // Faster initial velocity
            gravity: 1.5,        // Faster falling confetti
            ticks: 100
        });
    }, []);

    return (
        <div className="align-center-of-the-page welcome-container">

            <img
                src="https://img.clipart-library.com/2/clip-transparent-confetti-gif/clip-transparent-confetti-gif-16.gif"
                alt="Welcome"
                className="welcome-gif"
                hidden
            />
            <h1 className="text-success">Welcome to the Expense Tracker</h1>
            <p>Manage your finances effortlessly with our simple and intuitive tool.</p>
            <p>Track your expenses, set budgets, and stay in control of your money—all in one place.</p>
            <p>Let’s make managing your finances easy!</p>
        </div>
    );
};
