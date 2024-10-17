import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./User.css";
interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpensesSectionProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const ExpensesSection: React.FC<ExpensesSectionProps> = ({
  expenses,
  setExpenses,
}) => {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newExpense: Expense = {
      id: expenses.length + 1,
      name: formData.get("name") as string,
      amount: Number(formData.get("amount")),
      category: formData.get("category") as string,
      date: formData.get("date") as string,
    };
    setExpenses([...expenses, newExpense]);
    e.currentTarget.reset();
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleUpdateExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedExpense: Expense = {
      ...editingExpense!,
      name: formData.get("name") as string,
      amount: Number(formData.get("amount")),
      category: formData.get("category") as string,
      date: formData.get("date") as string,
    };
    setExpenses(
      expenses.map((exp) =>
        exp.id === updatedExpense.id ? updatedExpense : exp
      )
    );
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  return (
    <div className="expenses-section">
      <h3>Manage Expenses</h3>
      <form
        onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
        className="expense-form"
      >
        <input
          type="text"
          name="name"
          placeholder="Expense Name"
          defaultValue={editingExpense?.name}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          defaultValue={editingExpense?.amount}
          required
        />
        <select
          name="category"
          defaultValue={editingExpense?.category}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
        </select>
        <input
          type="date"
          name="date"
          defaultValue={editingExpense?.date}
          required
        />
        <button type="submit" className="btn-primary">
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
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
              <td>{expense.date}</td>
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
