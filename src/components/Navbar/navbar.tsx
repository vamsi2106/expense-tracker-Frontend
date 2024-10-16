import React from "react";
import { Link } from "react-router-dom";
export const Navbar = ()=>{
    return (
        <nav className='navbar bg-dark shadow p-3 d-flex gap-2'>
            <p><b><Link to='/'  className="text-white text-decoration-none">Expense Tracker</Link></b></p>
            <p><b><Link to="dashboard" className="text-white text-decoration-none">Dashboard</Link></b></p>
        </nav>
    )
}