import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpense, fetchExpenses } from "../../../store/expenses.slice";
import { Modal } from "../Modal/model";
import EditExpenseInputForm from "../FormComponent/editExpenseForm";
import { Empty } from "../Empty/empty";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material"; // Icons for buttons
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import './expenseTable.css'; // Import custom CSS for styles

export const Expense = () => {
  const { expenses } = useSelector((state: any) => state.expenses);
  const dispatch = useDispatch();
  const [editExpenseModel, setEditExpenseModel] = useState<boolean>(false);
  const [expenseDetails, setExpenseDetails] = useState<any>();

  let requiredExpenses = expenses.filter((item: any) => item.file_id === null);

  useEffect(() => {
    if (!expenses.length) {
      dispatch<any>(fetchExpenses()); // Fetch expenses if they are not loaded
    }
  }, [expenses, dispatch]);

  const triggerEditExpenseModel = () => {
    setEditExpenseModel(!editExpenseModel);
  };

  const EditExpense = (item: any) => {
    triggerEditExpenseModel();
    setExpenseDetails(item);
  };

  const deleteExpenseFromExpenses = async (id: string) => {
    try {
      const resultAction = await dispatch<any>(deleteExpense(id));
      if (deleteExpense.fulfilled.match(resultAction)) {
        dispatch<any>(fetchExpenses());
        toast.success('Expense deleted successfully!'); // Show success toast
      }
    } catch (error) {
      console.log("Error deleting expense:", error);
      toast.error('Error deleting expense'); // Show error toast
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <ToastContainer /> {/* Render the ToastContainer for notifications */}
      {requiredExpenses.length !== 0 ? (
        <TableContainer component={Paper} className="table-container" sx={{ maxWidth: "90%", margin: "20px auto" }}>
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <TableCell className="table-cell"><strong>Name</strong></TableCell>
                <TableCell className="table-cell"><strong>Category</strong></TableCell>
                <TableCell className="table-cell"><strong>Date</strong></TableCell>
                <TableCell className="table-cell"><strong>Amount</strong></TableCell>
                <TableCell className="table-cell"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requiredExpenses.map((item: any) => (
                <TableRow key={item.id} className="table-row">
                  <TableCell className="table-cell">{item.name}</TableCell>
                  <TableCell className="table-cell">{item.category}</TableCell>
                  <TableCell className="table-cell">{new Date(item.date).toLocaleDateString()}</TableCell>
                  <TableCell className="table-cell">{item.amount}</TableCell>
                  <TableCell className="table-cell">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Edit />}
                      onClick={() => EditExpense(item)}
                      className="edit-button"
                      sx={{ marginRight: "10px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => deleteExpenseFromExpenses(item.id)}
                      className="delete-button"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Empty />
      )}

      <Modal isOpen={editExpenseModel} onClose={triggerEditExpenseModel} title="Update Expense Details">
        <EditExpenseInputForm expenseDetails={expenseDetails} />
      </Modal>
    </div>
  );
};
