import React from 'react';
import { Modal } from "../Modal/model";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateExpense, fetchExpenses } from '../../store/expenses.slice';

interface EditExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  expense: any; // This will be the selected expense object to edit
}

export const EditExpenseModal: React.FC<EditExpenseModalProps> = ({ isOpen, onClose, expense }) => {
  const dispatch = useDispatch();

  // Define Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name field is required'),
    category: Yup.string().required('Category is required'),
    amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
    date: Yup.date().required('Date is required'),
  });

  // Use Formik for form handling
  const formik = useFormik({
    initialValues: {
      name: expense?.name || '',
      category: expense?.category || '',
      amount: expense?.amount || '',
      date: expense?.date ? new Date(expense.date).toISOString().split('T')[0] : '', // Format the date correctly
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formattedDate = values.date ? values.date.replace(/-/g, '/') : '';
        const customValues = { ...values, date: formattedDate };
        await dispatch<any>(updateExpense({ id: expense.id, updateDetails: customValues }));
        dispatch<any>(fetchExpenses()); // Fetch the updated list of expenses
        onClose(); // Close the modal after submission
      } catch (error) {
        console.log("Error updating expense:", error);
      }
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name && <div>{typeof formik.errors.name ==="string" ? formik.errors.name : ''}</div>}
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          >
            <option value="" label="Select category" />
            <option value="Food" label="Food" />
            <option value="Entertainment" label="Entertainment" />
            <option value="Taxes" label="Taxes" />
            <option value="Transport" label="Transport" />
            <option value="Utilities" label="Utilities" />
            <option value="Equipment" label="Equipment" />
            <option value="Maintenance" label="Maintenance" />
            <option value="Office Expenses" label="Office Expenses" />
            <option value="Events" label="Events" />
          </select>
          {formik.errors.category && formik.touched.category && <div>{typeof formik.errors.category ==="string" ? formik.errors.category : ''}</div>}
        </div>

        <div>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
          />
          {formik.errors.amount && formik.touched.amount && <div>{typeof formik.errors.amount ==="string" ? formik.errors.amount : ''}</div>}
        </div>

        <div>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
          />
          {formik.errors.date && formik.touched.date && <div>{formik.errors.date}</div>}
        </div>

        <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
          Submit
        </button>
      </form>
    </Modal>
  );
};
