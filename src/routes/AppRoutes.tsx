// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/admin/HomePage/HomePage";
import LoginPage from "../components/authentication/LoginPage";
import Runway from "../components/authentication/Runaway";
//import AdminDashboard from "../components/admin/AdminDashboard"; // Import your Admin Dashboard component
import UserDashboard from "../components/UserPanel/UserDashboard"; // Import your User Dashboard component
import ProtectedRoute from "./ProtectedRoute";
import AdminPanel from "../components/admin/AdminDashboard";
// import { ExpensesHome } from "../screen/Home/ExpensesHome";
// import { Dashboard } from "../screen/Dashboard/dashboard";
import NotFound from "../components/admin/Not-Found";
import { getCookie } from "../utils/cookieUtils";
import { DownloadFile } from "../exportDataFeauture/Download";

const AppRoutes: React.FC = () => {
  const userRole = getCookie("role");
  return (
    <Routes>
      {/* Root route to redirect based on user role */}
      <Route
        path="/"
        element={
          userRole === "admin" ? (
            <Navigate to="/admin" />
          ) : userRole === "user" ? (
            <Navigate to="/user" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
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
        path="/user/*"
        element={
          <ProtectedRoute element={<UserDashboard />} requiredRole="user" />
        }
      />
      <Route path="*" element={<NotFound />} />
      {/* Add more protected routes as needed */}
      {/*Routes added by nagasritha*/}
      {/*temp route*/}
      <Route path="/downloadfile" element={<DownloadFile />} />
    </Routes>
  );
};

export default AppRoutes;
