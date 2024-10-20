import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import "./User.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import ExpensesSection from "../../components/UserPanel/ExpenseSection";
import FilesSection from "../../components/UserPanel/FilesSection";
import CategoriesSection from "../../components/UserPanel/CategoriesSection";
import TagsSection from "../../components/UserPanel/TagsSection";
import RecurringExpensesSection from "../../components/UserPanel/RecurringExpensesSection";
import { fetchExpenses } from "../../store/slices/expenses/expenses.slice";
import { fetchFiles } from "../../store/slices/file/fileSlice";
import { fetchCategories } from "../../store/slices/category/categorySlice";
import { fetchTags } from "../../store/slices/tag/tagSlice";
import { fetchRecurringExpenses } from "../../store/recurringExpensesSlice";
import Navbar1 from "./Navbar";
import "./User.css";

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.userid);

  useEffect(() => {
    if (userId) {
      dispatch(fetchExpenses({ userId, params: {} }));
      dispatch(fetchFiles({ userId }));
      dispatch(fetchCategories(userId));
      dispatch(fetchTags(userId));
      dispatch(fetchRecurringExpenses(userId));
    }
  }, [dispatch, userId]);

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
              <Route path="categories" element={<CategoriesSection />} />
              <Route path="tags" element={<TagsSection />} />
              <Route
                path="recurring-expenses"
                element={<RecurringExpensesSection />}
              />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserDashboard;
