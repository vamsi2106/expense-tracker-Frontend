// src/routes/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/cookieUtils"; // Utility function to get cookies

interface ProtectedRouteProps {
  element: JSX.Element;
  role?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, role }) => {
  const token = getCookie("token"); // Assuming token is stored in cookies
  const userRole = getCookie("role"); // Assuming role is stored in cookies
  console.log("token", token);
  console.log("UserRole", userRole);
  if (!token) {
    console.log();
    // If the token doesn't exist, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (role && role !== userRole) {
    // If role exists and doesn't match the user's role, redirect to unauthorized page or home
    return <Navigate to="/" />;
  }

  // If authenticated and role matches, render the component
  return element;
};

export default ProtectedRoute;
