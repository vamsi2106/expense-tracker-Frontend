import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { UseSelector } from "react-redux";
import { fetchExpenses } from "../../../store/expenses.slice";

export const Error = () => {
  let dispatch = useDispatch();
  let { message } = useSelector((state: any) => state.expenses);

  let fetchData = () => {
    dispatch<any>(fetchExpenses());
  };

  return (
    <div className="align-center-of-the-page">
      <img src="" alt="error-page" />
      <h2 className="text-danger">Sorry! Failed to process your request</h2>
      <h3>{message}</h3>
      <button className="btn btn-primary" onClick={fetchData}>
        Retry
      </button>
    </div>
  );
};
