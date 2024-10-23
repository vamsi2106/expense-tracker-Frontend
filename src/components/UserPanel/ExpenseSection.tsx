import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../../store/slices/expenses/expenses.slice";
import { fetchCategories } from "../../store/slices/category/categorySlice";
import "./User.css";

// Loading component
const Loading: React.FC = () => {
  return <div className="loading">Loading...</div>;
};

interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
  category_name: string;
  transaction_type: string;
  currency: string;
}

// Currency symbol mapping
const currencySymbols: { [key: string]: string } = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
};

const ExpensesSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { expenses, page_status } = useSelector(
    (state: RootState) => state.expenses
  );
  const { categories } = useSelector((state: RootState) => state.categories);
  const userId = useSelector((state: RootState) => state.user.userid);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [filter, setFilter] = useState({
    category: "",
    transaction_type: "",
    date: "",
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchExpenses({ userId, params: {} }));
      dispatch(fetchCategories(userId));
    }
  }, [dispatch, userId]);

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newExpense = {
      amount: Number(formData.get("amount")),
      date: formData.get("date") as string,
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      transaction_type:
        (formData.get("transaction_type") as string) || "expense",
      currency: (formData.get("currency") as string) || "INR",
      description: (formData.get("description") as string) || "",
    };
    if (userId) {
      dispatch(createExpense({ userId, expenseData: newExpense }))
        .unwrap()
        .then(() => {
          dispatch(fetchExpenses({ userId, params: {} }));
          toast.success("Expense added successfully!");
        })
        .catch(() => {
          toast.error("Failed to add expense.");
        });
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
      transaction_type: formData.get("transaction_type") as string,
      currency: formData.get("currency") as string,
      description: (formData.get("description") as string) || "",
    };
    if (userId) {
      dispatch(
        updateExpense({
          userId,
          id: updatedExpense.id,
          updateDetails: updatedExpense,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(fetchExpenses({ userId, params: {} }));
          toast.info("Expense updated successfully!");
        })
        .catch(() => {
          toast.error("Failed to update expense.");
        });
    }
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id: string) => {
    if (userId) {
      dispatch(deleteExpense({ userId, id }))
        .unwrap()
        .then(() => {
          dispatch(fetchExpenses({ userId, params: {} }));
          toast.error("Expense deleted!");
        })
        .catch(() => {
          toast.error("Failed to delete expense.");
        });
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = filter.category
      ? expense.category === filter.category
      : true;
    const matchesType = filter.transaction_type
      ? expense.transaction_type === filter.transaction_type
      : true;
    const matchesDate = filter.date
      ? new Date(expense.date).toISOString().substring(0, 10) === filter.date
      : true;
    return matchesCategory && matchesType && matchesDate;
  });

  return (
    <div className="expenses-section">
      <ToastContainer />
      <h3>Manage Expenses</h3>

      {page_status === "loading" ? (
        <Loading />
      ) : (
        <>
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
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                style={{ width: "20%", margin: "5px" }}
                type="date"
                name="date"
                defaultValue={
                  editingExpense
                    ? new Date(editingExpense.date).toISOString().substr(0, 10)
                    : ""
                }
                required
              />
              <select
                style={{ width: "20%", margin: "5px" }}
                name="transaction_type"
                defaultValue={editingExpense?.transaction_type || "expense"}
                required
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <select
                style={{ width: "20%", margin: "5px" }}
                name="currency"
                defaultValue={editingExpense?.currency || "INR"}
                required
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
              <input
                style={{ width: "20%", margin: "5px" }}
                type="text"
                name="description"
                placeholder="Description (optional)"
                defaultValue={editingExpense?.description}
              />
              <button
                style={{ width: "14%", margin: "5px" }}
                type="submit"
                className={`btn-primary ${editingExpense ? "editing" : ""}`}
              >
                {editingExpense ? "Update Expense" : "Add Expense"}
              </button>
            </div>
          </form>

          <div>
            <label>Category:</label>
            <select name="category" onChange={handleFilterChange}>
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <label>Type:</label>
            <select name="transaction_type" onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <label>Date:</label>
            <input type="date" name="date" onChange={handleFilterChange} />
          </div>
          <table className="expenses-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Type</th>
                <th>Currency</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.name}</td>
                  <td>
                    {currencySymbols[expense.currency] || "?"}
                    {expense.amount.toFixed(2)}
                  </td>
                  <td>{expense.category_name}</td>
                  <td>{new Date(expense.date).toDateString()}</td>
                  <td>{expense.transaction_type}</td>
                  <td>{expense.currency}</td>
                  <td>
                    <button
                      onClick={() => handleEditExpense(expense)}
                      className={`btn-icon ${
                        editingExpense?.id === expense.id ? "active" : ""
                      }`}
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
        </>
      )}
    </div>
  );
};

export default ExpensesSection;
