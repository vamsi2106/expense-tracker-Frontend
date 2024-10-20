import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchRecurringExpenses } from "../../store/recurringExpensesSlice";
import { Table } from "antd";

const RecurringExpensesSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recurringExpenses, status } = useSelector(
    (state: RootState) => state.recurringExpenses
  );
  const userId = useSelector((state: RootState) => state.user.userid);

  useEffect(() => {
    if (userId) {
      dispatch(fetchRecurringExpenses(userId));
    }
  }, [dispatch, userId]);

  const columns = [
    { title: "Expense ID", dataIndex: "expense_id", key: "expense_id" },
    { title: "Frequency", dataIndex: "frequency", key: "frequency" },
    { title: "Start Date", dataIndex: "start_date", key: "start_date" },
    { title: "End Date", dataIndex: "end_date", key: "end_date" },
  ];

  return (
    <div>
      <h3>Recurring Expenses</h3>
      <Table
        dataSource={recurringExpenses}
        columns={columns}
        rowKey="id"
        loading={status === "loading"}
      />
    </div>
  );
};

export default RecurringExpensesSection;
