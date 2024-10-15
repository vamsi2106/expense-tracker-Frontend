// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/HomePage/HomePage";
import LoginPage from "../components/authentication/LoginPage";
import Runway from "../components/authentication/Runaway";
import AdminDashboard from "../components/admin/AdminDashboard"; // Import your Admin Dashboard component
import UserDashboard from "../components/user/UserDashboard"; // Import your User Dashboard component
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<ProtectedRoute element={<Home />} requiredRole="admin" />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/runway" element={<Runway />} />
      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />
        }
      />
      {/* User routes */}
      <Route
        path="/user"
        element={
          <ProtectedRoute element={<UserDashboard />} requiredRole="user" />
        }
      />
      {/* Add more protected routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
