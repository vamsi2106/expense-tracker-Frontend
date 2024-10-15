// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/HomePage/HomePage";
import LoginPage from "../components/authentication/LoginPage";
import Runway from "../components/authentication/Runaway";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute element={<Home />} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/runway" element={<Runway />} />
      {/* Add more protected routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
