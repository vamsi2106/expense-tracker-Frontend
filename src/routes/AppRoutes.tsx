import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "../components/authentication/LoginPage";
import Runway from "../components/authentication/Runaway";
import UserDashboard from "../components/user-panel/user/UserDashboard";
import ProtectedRoute from "./ProtectedRoute";
import AdminPanel from "../components/admin/AdminDashboard";
import { ExpensesHome } from "../screen/Home/ExpensesHome";
import { Dashboard } from "../screen/Dashboard/dashboard";
import NotFound from "../components/admin/Not-Found";

// Mock function to get token and user role
const getToken = () => localStorage.getItem("token");
const getUserRole = () => localStorage.getItem("userRole");

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/runway" element={<Runway />} />
      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute element={<AdminPanel />} requiredRole="admin" />
        }
      />
      {/* User routes */}
      <Route
        path="/user/*"
        element={
          <ProtectedRoute element={<UserDashboard />} requiredRole="user" />
        }
      />
      <Route path="*" element={<NotFound />} />
      {/* Additional protected routes */}
      <Route
        path="/user/home"
        element={
          <ProtectedRoute element={<ExpensesHome />} requiredRole="user" />
        }
      />
      <Route
        path="/user/dashboard"
        element={<ProtectedRoute element={<Dashboard />} requiredRole="user" />}
      />
    </Routes>
  );
};

export default AppRoutes;
