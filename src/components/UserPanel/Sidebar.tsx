import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartLine,
  FaFileUpload,
  FaList,
  FaSignOutAlt,
} from "react-icons/fa";

import "./User.css";

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h1 className="dashboard-title">
          <span className="expense">Expense</span>{" "}
          <span className="tracker">Tracker</span>
        </h1>

      </div>
      <ul className="nav-links">
        <li className={location.pathname === "/user" ? "active" : ""}>
          <Link to="/user">
            <FaChartLine />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={location.pathname === "/user/expenses" ? "active" : ""}>
          <Link to="/user/expenses">
            <FaList />
            <span>Expenses</span>
          </Link>
        </li>
        <li className={location.pathname === "/user/files" ? "active" : ""}>
          <Link to="/user/files">
            <FaFileUpload />
            <span>Files</span>
          </Link>
        </li>
        <li className="logout">
          <Link to="/logout">
            <FaSignOutAlt />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
