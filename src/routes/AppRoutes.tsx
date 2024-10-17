// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/admin/HomePage/HomePage";
import LoginPage from "../components/authentication/LoginPage";
import Runway from "../components/authentication/Runaway";
//import AdminDashboard from "../components/admin/AdminDashboard"; // Import your Admin Dashboard component
import UserDashboard from "../components/user-panel/user/UserDashboard"; // Import your User Dashboard component
import ProtectedRoute from "./ProtectedRoute";
import AdminPanel from "../components/admin/AdminDashboard";
import { ExpensesHome } from "../screen/Home/ExpensesHome";
import { Dashboard } from "../screen/Dashboard/dashboard";
import NotFound from "../components/admin/Not-Found";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
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
        path="/user"
        element={
          <ProtectedRoute element={<UserDashboard />} requiredRole="user" />
        }
      />
      <Route path="*" element={<NotFound />} />
      {/* Add more protected routes as needed */}
      {/*Routes added by nagasritha*/}
      <Route path="/user/home" element={<ExpensesHome />} />
      <Route path="/user/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
