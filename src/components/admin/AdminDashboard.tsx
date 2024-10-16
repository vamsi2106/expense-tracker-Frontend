// import React, { useState } from "react";
// import Logout from "../authentication/Logout";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Container,
// } from "@mui/material";
// import { Routes, Route, Navigate, Link } from "react-router-dom";
// import RegisterUser from "./RegisterUser"; // Assuming you have this component
// import UsersList from "./UsersList"; // Assuming you have this component
// import RemoveUser from "./RemoveUser"; // Assuming you have this component

// const AdminDashboard: React.FC = () => {
//   const [selectedPage, setSelectedPage] = useState("RegisterUser");

//   const handlePageChange = (page: string) => {
//     setSelectedPage(page);
//   };

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6">Admin Dashboard</Typography>
//           <Logout />
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent">
//         <List>
//           <ListItem
//             component={Link}
//             to="/admin/register"
//             onClick={() => handlePageChange("RegisterUser")}
//           >
//             <ListItemText primary="Register User" />
//           </ListItem>
//           <ListItem
//             component={Link}
//             to="/admin/users"
//             onClick={() => handlePageChange("UsersList")}
//           >
//             <ListItemText primary="Users List" />
//           </ListItem>
//           <ListItem
//             component={Link}
//             to="/admin/remove"
//             onClick={() => handlePageChange("RemoveUser")}
//           >
//             <ListItemText primary="Remove User" />
//           </ListItem>
//         </List>
//       </Drawer>
//       <Container style={{ marginLeft: "240px", padding: "20px" }}>
//         <Typography variant="h4">{selectedPage}</Typography>
//         <Routes>
//           <Route path="/" element={<Navigate to="/admin/register" />} />
//           <Route path="/admin/register" element={<RegisterUser />} />
//           <Route path="/admin/users" element={<UsersList />} />
//           <Route path="/admin/remove" element={<RemoveUser />} />
//           {/* Add more routes as needed */}
//         </Routes>
//       </Container>
//     </>
//   );
// };

// export default AdminDashboard;

// src/components/admin/AdminDashboard.tsx
// import React from "react";
// import { Link, Routes, Route } from "react-router-dom";
// import Logout from "../authentication/Logout"; // Adjust path if necessary
// import RegisterUser from "./RegisterUser";
// import UsersList from "./UsersList";
// import RemoveUser from "./RemoveUser";
// import "./admin.css"; // Import your CSS file

// const AdminDashboard: React.FC = () => {
//   return (
//     <div className="admin-dashboard">
//       <header className="admin-header">
//         <h1>Admin Dashboard</h1>
//         <Logout />
//       </header>
//       <nav className="admin-nav">
//         <ul>
//           <li>
//             <Link to="/admin/register">Register User</Link>
//           </li>
//           <li>
//             <Link to="/admin/users">Users List</Link>
//           </li>
//           <li>
//             <Link to="/admin/remove">Remove User</Link>
//           </li>
//         </ul>
//       </nav>
//       <div className="admin-content">
//         <Routes>
//           <Route path="register" element={<RegisterUser />} />
//           <Route path="users" element={<UsersList />} />
//           <Route path="remove" element={<RemoveUser />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

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
        <h1>Admin Dashboard</h1>
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
