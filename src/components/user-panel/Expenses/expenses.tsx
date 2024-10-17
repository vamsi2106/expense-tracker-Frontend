import { ExpenseModal } from "../ExpenseModel/expenseform.model";
import {
  deleteExpense,
  fetchExpenses,
  getExpenseById,
} from "../../../store/expenses.slice";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../Modal/model";
import EditExpenseInputForm from "../FormComponent/editExpenseForm";

import "../HomeSuccessPage/homeSuccessPage.css";
import { useEffect, useState } from "react";
import { Empty } from "../Empty/empty";

export const Expense = () => {
  const { expenses } = useSelector((state: any) => state.expenses);
  const dispatch = useDispatch();
  const [editExpenseModel, setEditExpenseModel] = useState<boolean>(false);
  const [expenseDetails, setExpenseDetails] = useState<any>();
  const userId = "yourUserId"; // Replace with the actual userId
  let requiredExpenses = expenses.filter((item: any) => item.file_id === null);

  useEffect(() => {
    if (!expenses.length) {
      dispatch<any>(fetchExpenses({ userId })); // Fetch expenses if they are not loaded
    }
  }, [expenses, dispatch, userId]);

  const triggerEditExpenseModel = () => {
    setEditExpenseModel(!editExpenseModel);
  };

  const EditExpense = (item: any) => {
    triggerEditExpenseModel();
    setExpenseDetails(item);
    console.log(item);
  };

  const deleteExpenseFromExpenses = async (id: string) => {
    try {
      const resultAction = await dispatch<any>(deleteExpense({ userId, id }));
      if (deleteExpense.fulfilled.match(resultAction)) {
        dispatch<any>(fetchExpenses({ userId }));
      }
    } catch (error) {
      console.log("Error deleting expense:", error);
    }
  };

  return (
    <div>
      {requiredExpenses.length !== 0 ? (
        requiredExpenses.map((item: any) => (
          <div key={item.id} className="m-5 p-4 rounded shadow">
            <div>
              <h1>{item.name}</h1>
              <div className="m-3">
                <p>
                  <b>Category: </b>
                  {item.category}
                </p>
                <p>
                  <b>Date: </b>
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <p>
                  <b>Amount: </b>
                  {item.amount}
                </p>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-danger"
                onClick={() => deleteExpenseFromExpenses(item.id)}
              >
                Delete
              </button>
              <button
                className="btn btn-warning"
                onClick={() => EditExpense(item)}
              >
                Edit
              </button>
            </div>
          </div>
        ))
      ) : (
        <Empty />
      )}
      <Modal
        isOpen={editExpenseModel}
        onClose={triggerEditExpenseModel}
        title="Update Expense Details"
      >
        <EditExpenseInputForm expenseDetails={expenseDetails} />
      </Modal>
    </div>
  );
};
