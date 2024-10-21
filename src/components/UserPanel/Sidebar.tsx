import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  FaChartLine,
  FaList,
  FaFileUpload,
  FaTags,
  FaCalendarAlt,
} from "react-icons/fa";
import "./Sidebar.css";
import Logout from "../authentication/Logout";

const Sidebar: React.FC = () => {
  return (
    <div
      className="sidebar"
      style={{ background: "#f0f2f5", height: "100vh", padding: "20px" }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", border: "none" }}
      >
        <Menu.Item key="1" icon={<FaChartLine />}>
          <Link to="/user/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FaList />}>
          <Link to="/user/expenses">Expenses</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FaFileUpload />}>
          <Link to="/user/files">Files</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<FaList />}>
          <Link to="/user/categories">Categories</Link>
        </Menu.Item>
        {/* <Menu.Item key="5" icon={<FaTags />}>
          <Link to="/user/tags">Tags</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<FaCalendarAlt />}>
          <Link to="/user/recurring-expenses">Recurring Expenses</Link>
        </Menu.Item> */}
        <Menu.Item key="6">
          <Logout />
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
