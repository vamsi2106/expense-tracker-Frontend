import { useFormik, Formik, Field, Form, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import "./forms.css";
import { createFile } from "../../../store/files.slice";
import { fetchExpenses } from "../../../store/expenses.slice";

const FileExpenceInputForm = () => {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state: any) => state.expenses);
  console.log(message, error);
  let { expenses } = useSelector((state: any) => state.expenses);
  console.log(expenses);
  const userId = "yourUserId"; // Replace with the actual userId

  // Define Yup validation schema
  const validationSchema = Yup.object({
    file: Yup.mixed()
      .required("A CSV file is required")
      .test("fileFormat", "Only CSV files are allowed", (value) => {
        return value && value instanceof File && value.type === "text/csv";
      }),
  });

  // Handle form submission
  const handleSubmit = async (values: any) => {
    console.log(values);

    // Create FormData to send the file
    const formData = new FormData();
    formData.append("file", values.file);

    // Dispatch the createFile action to upload the file
    let result = await dispatch<any>(
      createFile({ userId, fileData: formData })
    );
    if (createFile.fulfilled.match(result)) {
      dispatch<any>(fetchExpenses({ userId }));
    }
  };

  return (
    <Formik
      initialValues={{ file: null }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isValid, isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="file" className="label">
              Upload CSV file:
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept=".csv"
              onChange={(event) => {
                const files = event.currentTarget.files;
                if (files && files.length > 0) {
                  setFieldValue("file", files);
                } else {
                  setFieldValue("file", null); // Set to null if no file is selected
                }
              }}
            />
            <ErrorMessage name="file">
              {(msg) => <div className="text-danger">{msg}</div>}
            </ErrorMessage>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isValid || isSubmitting}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FileExpenceInputForm;
