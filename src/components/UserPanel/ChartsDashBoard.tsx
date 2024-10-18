import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  fetchExpensesGroupedByCategory,
  fetchExpensesGroupedByWeek,
  fetchExpensesGroupedByMonth,
  fetchExpensesGroupedByDate,
} from "../../store/expenses.slice";
import { Pie, PolarArea, Radar, Line } from "react-chartjs-2";
import "chart.js/auto";
import "./User.css";

const ChartsDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.userid);
  const expensesGroupedByCategory = useSelector(
    (state: RootState) => state.expenses.expensesFilterdByCategory
  );
  const expensesGroupedByWeek = useSelector(
    (state: RootState) => state.expenses.expensesFilterdByWeek
  );
  const expensesGroupedByMonth = useSelector(
    (state: RootState) => state.expenses.expensesFilterdByMonth
  );
  const expensesGroupedByDay = useSelector(
    (state: RootState) => state.expenses.expensesFilterdByDay
  );

  useEffect(() => {
    if (userId) {
      dispatch(
        fetchExpensesGroupedByCategory({
          userId,
          startDate: "2023-01-01",
          endDate: "2023-12-31",
        })
      );
      dispatch(
        fetchExpensesGroupedByWeek({
          userId,
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        })
      );
      dispatch(
        fetchExpensesGroupedByMonth({
          userId,
          year: new Date().getFullYear(),
        })
      );
      dispatch(
        fetchExpensesGroupedByDate({
          userId,
          offset: 0,
        })
      );
    }
  }, [dispatch, userId]);

  const pieData = {
    labels: expensesGroupedByCategory?.map((item: any) => item.category),
    datasets: [
      {
        data: expensesGroupedByCategory?.map((item: any) => item.total_amount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const polarData = {
    labels: expensesGroupedByWeek?.map(
      (item: any, index: number) => `Week ${index + 1}`
    ),
    datasets: [
      {
        data: expensesGroupedByWeek?.map((item: any) => item.total_amount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const radarData = {
    labels: expensesGroupedByMonth?.map((item: any) => `Month ${item.month}`),
    datasets: [
      {
        label: "Monthly Expenses",
        data: expensesGroupedByMonth?.map((item: any) => item.total_amount),
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBackgroundColor: "rgba(179,181,198,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(179,181,198,1)",
      },
    ],
  };

  const lineData = {
    labels: expensesGroupedByDay?.map((item: any) => item.date),
    datasets: [
      {
        label: "Daily Expenses",
        data: expensesGroupedByDay?.map((item: any) => item.total_amount),
        fill: false,
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
      },
    ],
  };

  return (
    <div className="dashboard-charts">
      <h3>Expense Overview</h3>
      <div className="chart-container">
        <h4>Expense Categories</h4>
        <Pie data={pieData} />
      </div>
      <div className="chart-container">
        <h4>Weekly Expenses</h4>
        <PolarArea data={polarData} />
      </div>
      <div className="chart-container">
        <h4>Monthly Expenses</h4>
        <Radar data={radarData} />
      </div>
      <div className="chart-container">
        <h4>Daily Expenses</h4>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default ChartsDashboard;
