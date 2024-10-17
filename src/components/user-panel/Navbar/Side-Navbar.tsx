import React, { useState } from "react";
import { LogOut } from "lucide-react";

const SideNavbar = () => {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "expenses" | "files"
  >("dashboard");
  return (
    <div>
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <button
            className={`nav-button ${
              activeTab === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`nav-button ${activeTab === "expenses" ? "active" : ""}`}
            onClick={() => setActiveTab("expenses")}
          >
            Expenses
          </button>
          <button
            className={`nav-button ${activeTab === "files" ? "active" : ""}`}
            onClick={() => setActiveTab("files")}
          >
            Uploaded Files
          </button>
        </nav>
        <button className="logout-button">
          <LogOut className="logout-icon" />
          <span>Logout</span>
        </button>
      </aside>
    </div>
  );
};

export default SideNavbar;
