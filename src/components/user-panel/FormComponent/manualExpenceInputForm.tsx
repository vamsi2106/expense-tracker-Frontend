import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import "./forms.css";
import { PageStatus } from "../../../utils/pageStatus";
import {
  createExpense,
  fetchExpenses,
  updateExpense,
} from "../../../store/expenses.slice";

interface ManualExpenseInputFormProps {
  isUpdate?: boolean; // Prop to determine if the form is for updating
  id?: string;
  name?: string;
}

const ManualExpenseInputForm: React.FC<ManualExpenseInputFormProps> = ({
  isUpdate,
  id,
  name,
}) => {
  // Define Yup validation schema
  console.log(id, name);
  const validationSchema = Yup.object({
    name: Yup.string().required("Name field is required"),
    category: Yup.string().required("Category is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    date: Yup.date().required("Date is required"),
  });

  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.expenses);
  console.log(data);
  const pageStatusObject = new PageStatus();
  const messageColor =
    data.page_status === pageStatusObject.success
      ? "text-success"
      : "text-danger";

  // Function to add or update expenses
  const addExpenses = async (values: any) => {
    console.log("function triggerd");
    try {
      let resultAction;
      if (!isUpdate) {
        resultAction = await dispatch<any>(createExpense(values));
        if (createExpense.fulfilled.match(resultAction)) {
          await dispatch<any>(fetchExpenses());
        }
      } else {
        console.log(id, name);
        resultAction = await dispatch<any>(
          updateExpense({ id, updateDetails: values })
        ); // Ensure correct argument structure
        if (updateExpense.fulfilled.match(resultAction)) {
          await dispatch<any>(fetchExpenses());
        }
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const { expense } = useSelector((state: any) => state.expenses);
  console.log(expense);

  // Use Formik for form handling
  const formik = useFormik({
    initialValues: {
      name: isUpdate ? expense?.name : "",
      category: isUpdate ? expense?.category : "",
      amount: isUpdate ? expense?.amount : "",
      date: isUpdate ? expense?.date : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const formattedDate = values.date ? values.date.replace(/-/g, "/") : "";
      const customValues = {
        name: values.name,
        category: values.category,
        amount: values.amount,
        date: formattedDate,
      };
      addExpenses(customValues);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="label">
          Title
        </label>
        <input
          className="input"
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name ? (
          <div className="text-danger">
            {typeof formik.errors.name === "string" ? formik.errors.name : ""}
          </div>
        ) : null}
      </div>

      {/* Category Field */}
      <div>
        <label htmlFor="category" className="label">
          Category
        </label>
        <select
          className="input"
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
        {formik.errors.category && formik.touched.category ? (
          <div className="text-danger">
            {typeof formik.errors.category === "string"
              ? formik.errors.category
              : ""}
          </div>
        ) : null}
      </div>

      {/* Amount Field */}
      <div>
        <label htmlFor="amount" className="label">
          Amount
        </label>
        <input
          className="input"
          id="amount"
          name="amount"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.amount}
        />
        {formik.errors.amount && formik.touched.amount ? (
          <div className="text-danger">
            {typeof formik.errors.amount === "string"
              ? formik.errors.amount
              : ""}
          </div>
        ) : null}
      </div>

      {/* Date Field */}
      <div>
        <label htmlFor="date" className="label">
          Date
        </label>
        <input
          className="input"
          id="date"
          name="date"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.date}
        />
        {formik.errors.date && formik.touched.date ? (
          <div className="text-danger">
            {typeof formik.errors.date === "string" ? formik.errors.date : ""}
          </div>
        ) : null}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!formik.isValid || formik.isSubmitting}
      >
        Submit
      </button>
      <p className={messageColor}>{data.message}</p>
    </form>
  );
};

export default ManualExpenseInputForm;
