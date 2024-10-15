import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/cookieUtils";

interface ProtectedRouteProps {
  element: JSX.Element;
  requiredRole?: string; // Role needed to access the route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  requiredRole,
}) => {
  const token = getCookie("token"); // Get token from cookies
  const userRole = getCookie("role"); // Get role from cookies

  // If the token doesn't exist, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If a required role is specified, check if the user's role matches it
  if (requiredRole && userRole !== requiredRole) {
    // Redirect to a route based on the user's role
    // For example, if the user is an admin but tries to access a user page
    return userRole === "admin" ? (
      <Navigate to="/admin" />
    ) : (
      <Navigate to="/user" />
    );
  }

  // If authenticated and role matches, render the component
  return element;
};

export default ProtectedRoute;
