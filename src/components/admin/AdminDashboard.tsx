import React, { useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchUsers } from "../../store/usersListSlice"; // Import fetchUsers
import Logout from "../authentication/Logout";
import RegisterUser from "./RegisterUser";
import UsersList from "./UsersList";
import RemoveUser from "./RemoveUser";
import "./admin.css"; // Import your CSS file

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Fetch users when the dashboard loads
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage or your preferred method
    if (token) {
      dispatch(fetchUsers(token)); // Dispatch fetchUsers with the token
    }
  }, [dispatch]);

  return (
    <div className="admin-dashboard">

      <header className="admin-header">
        <h1 className="admin-nav">Admin Dashboard</h1>
        <Logout />
      </header>
      <nav className="admin-nav">
        <ul>
          <li>
            <Link to="/admin/register">Register User</Link>
          </li>
          <li>
            <Link to="/admin/users">Users List</Link>
          </li>
          <li>
            <Link to="/admin/remove">Remove User</Link>
          </li>
        </ul>
      </nav>
      <div className="admin-content">
        <Routes>
          <Route path="register" element={<RegisterUser />} />
          <Route path="users" element={<UsersList />} />
          <Route path="remove" element={<RemoveUser />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
