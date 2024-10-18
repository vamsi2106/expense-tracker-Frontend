import React from "react";
import { Link } from "react-router-dom";
import Logout from "../../authentication/Logout";
import { AppBar, Toolbar, Typography } from "@mui/material";
import './navbar.css'; // Import the CSS file

export const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link to='/user/home' className="navbar-link">
                        Expense<span style={{ fontSize: '30px', color: "orange" }}>Tracker</span>
                    </Link>
                    <Link to="/user/dashboard" className="navbar-link">
                        Dashboard
                    </Link>
                </Typography>
                <Logout />
            </Toolbar>
        </AppBar>
    );
};
