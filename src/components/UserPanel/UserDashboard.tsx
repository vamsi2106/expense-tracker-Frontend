import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import ExpensesSection from "../../components/UserPanel/ExpenseSection";
import FilesSection from "../../components/UserPanel/FilesSection";
import {
  FaChartLine,
  FaList,
  FaFileUpload,
  FaSignOutAlt,
} from "react-icons/fa";

import "./User.css";
import Navbar1 from "./Navbar";

interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
}

interface File {
  id: number;
  name: string;
  uploadDate: string;
}

const UserDashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      name: "Groceries",
      amount: 50,
      category: "Food",
      date: "2024-07-21",
    },
    {
      id: 2,
      name: "Gas",
      amount: 30,
      category: "Transport",
      date: "2024-07-22",
    },
    {
      id: 3,
      name: "Movie",
      amount: 15,
      category: "Entertainment",
      date: "2024-07-23",
    },
  ]);
  const [files, setFiles] = useState<File[]>([
    { id: 1, name: "receipt.pdf", uploadDate: "2024-07-22" },
    { id: 2, name: "budget.xlsx", uploadDate: "2024-07-23" },
  ]);

  const location = useLocation();

  return (
    <>
      <Navbar1 />
      <div className="user-dashboard">
        <Sidebar />
        <main className="content">
          <div className="content-body">
            <Routes>
              <Route
                path="/"
                element={<DashboardContent expenses={expenses} />}
              />
              <Route
                path="expenses"
                element={
                  <ExpensesSection
                    expenses={expenses}
                    setExpenses={setExpenses}
                  />
                }
              />
              <Route
                path="files"
                element={<FilesSection files={files} setFiles={setFiles} />}
              />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserDashboard;
