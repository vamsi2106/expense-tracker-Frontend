// src/components/admin/AdminDashboard.tsx
import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchUsers } from "../../store/usersListSlice";
import { FaUserPlus, FaUsers, FaSignOutAlt } from "react-icons/fa";
import Logout from "../authentication/Logout";
import RegisterUser from "./RegisterUser/RegisterUser";
import UsersList from "../admin/UsersList/UsersList";
import "./admin.css";

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUsers());
    }
  }, [dispatch]);

  const navItems = [
    { path: "/admin/register", icon: <FaUserPlus />, text: "Register User" },
    { path: "/admin/users", icon: <FaUsers />, text: "Users List" },
  ];

  return (
    <div
      className={`admin-dashboard ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <nav className="admin-sidebar">
        <div className="sidebar-header">
          <h1 className="admin-title">
            <span className="expense">Expense</span>{" "}
            <strong className="tracker">Tracker</strong>
          </h1>
          <img
            className="admin-profile-img"
            src={
              user.profileImg ??
              "https://www.freepnglogos.com/uploads/student-png/student-png-sammilani-mahavidyalaya-undergraduate-and-24.png"
            }
          />
          <div>
            <strong className="admin-subtitle">{user.username}</strong>
            <br />
            <strong className="admin-subtitle">{user.userEmail}</strong>
          </div>
        </div>
        <hr style={{ width: "100%" }} />
        <ul className="nav-links">
          {navItems.map((item) => (
            <li
              key={item.path}
              className={location.pathname === item.path ? "active" : ""}
            >
              <Link to={item.path}>
                {item.icon}
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
          <li>
            <Logout />
          </li>
        </ul>
      </nav>
      <div className="admin-content">
        <header className="content-header-1">
          <h2>Expenses Tracker Admin Dashboard</h2>
        </header>
        <main className="content-main">
          <Routes>
            <Route path="register" element={<RegisterUser />} />
            <Route path="users" element={<UsersList />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
