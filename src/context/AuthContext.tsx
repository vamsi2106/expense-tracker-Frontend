// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (loginData: { email: string; password: string }) => {
    const response = await axios.post("/auth/user/login", loginData);
    setToken(response.data.token);
    setUserRole(response.data.role);
    setIsAuthenticated(true);
  };

  const adminLogin = async (loginData: { email: string; password: string }) => {
    const response = await axios.post("/auth/admin/login", loginData);
    setToken(response.data.token);
    setUserRole(response.data.role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    setUserRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, token, login, adminLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
