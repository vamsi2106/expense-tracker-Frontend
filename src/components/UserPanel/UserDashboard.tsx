import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
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
import { fetchExpenses } from "../../store/expenses.slice";
import { fetchFiles } from "../../store/files.slice";
import "./User.css";
import Navbar1 from "./Navbar";
const UserDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.userid);
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const files = useSelector((state: RootState) => state.files.files);

  useEffect(() => {
    if (userId) {
      dispatch(fetchExpenses({ userId, params: {} }));
      dispatch(fetchFiles({ userId }));
    }
  }, [dispatch, userId]);

  const location = useLocation();

  return (
    <>
      <Navbar1 />
      <div className="user-dashboard">
        <Sidebar />
        <main className="content">
          <div className="content-body">
            <Routes>
              <Route path="/" element={<DashboardContent />} />
              <Route path="expenses" element={<ExpensesSection />} />
              <Route path="files" element={<FilesSection />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserDashboard;
