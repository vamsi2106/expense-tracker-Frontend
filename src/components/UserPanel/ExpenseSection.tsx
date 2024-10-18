import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the toastify CSS
import {
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../../store/expenses.slice";
import "./User.css";

interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
}

const ExpensesSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { expenses, page_status, message } = useSelector(
    (state: RootState) => state.expenses
  );
  const userId = useSelector((state: RootState) => state.user.userid);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    if (page_status === "loading") {
      toast.warning("Loading...", { autoClose: 3000 });
    }
  }, [page_status]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchExpenses({ userId, params: {} }));
    }
  }, [dispatch, userId]);

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newExpense = {
      user_id: userId, // Ensure userId is included
      name: formData.get("name") as string,
      amount: Number(formData.get("amount")),
      category: formData.get("category") as string,
      date: formData.get("date") as string,
    };
    if (userId) {
      dispatch(createExpense({ userId, expenseData: newExpense }));
      toast.success("Expense added successfully!"); // Toast notification
    }
    e.currentTarget.reset();
  };

  const handleUpdateExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedExpense = {
      ...editingExpense!,
      name: formData.get("name") as string,
      amount: Number(formData.get("amount")),
      category: formData.get("category") as string,
      date: formData.get("date") as string,
    };
    if (userId) {
      dispatch(
        updateExpense({
          userId,
          id: updatedExpense.id.toString(),
          updateDetails: updatedExpense,
        })
      );
      toast.info("Expense updated successfully!"); // Toast notification
    }
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id: number) => {
    if (userId) {
      dispatch(deleteExpense({ userId, id: id.toString() }));
      toast.error("Expense deleted!"); // Toast notification
    }
  };

  return (
    <div className="expenses-section">
      <ToastContainer />
      <h3>Manage Expenses</h3>
      <form
        onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
        className="expense-form"
      >
        <div style={{ width: "100%" }}>
          <input
            style={{ width: "20%", margin: "5px" }}
            type="text"
            name="name"
            placeholder="Expense Name"
            defaultValue={editingExpense?.name}
            required
          />
          <input
            style={{ width: "20%", margin: "5px" }}
            type="number"
            name="amount"
            placeholder="Amount"
            defaultValue={editingExpense?.amount}
            required
          />
          <select
            style={{ width: "20%", margin: "5px" }}
            name="category"
            defaultValue={editingExpense?.category}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Taxes">Taxes</option>
            <option value="Office Expenses">Office Expenses</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Events">Events</option>
            <option value="Others">Others</option>
          </select>
          <input
            style={{ width: "20%", margin: "5px" }}
            type="date"
            name="date"
            defaultValue={editingExpense?.date}
            required
          />
          <button
            style={{ width: "14%", margin: "5px" }}
            type="submit"
            className="btn-primary"
          >
            {editingExpense ? "Update Expense" : "Add Expense"}
          </button>
        </div>
      </form>
      <table className="expenses-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{expense.category}</td>
              <td>{new Date(expense.date).toDateString()}</td>
              <td>
                <button
                  onClick={() => handleEditExpense(expense)}
                  className="btn-icon"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteExpense(expense.id)}
                  className="btn-icon delete"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesSection;
