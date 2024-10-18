import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  fetchExpensesGroupedByWeek,
  fetchExpensesGroupedByCategory,
  fetchExpensesGroupedByMonth,
  fetchExpensesGroupedByYear,
} from "../../store/expenses.slice";
import "./User.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const DashboardContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.userid);
  const expensesGroupedByWeek = useSelector(
    (state: RootState) => state.expenses.expensesFilterdByWeek
  );
  const expensesGroupedByCategory = useSelector(
    (state: RootState) => state.expenses.expensesFilterdByCategory
  );
  const expensesGroupedByMonth = useSelector(
    (state: RootState) => state.expenses.expensesFilterdByMonth
  );
  const expensesGroupedByYear = useSelector(
    (state: RootState) => state.expenses.expensesFilterdByYear
  );

  const [chartData, setChartData] = useState<
    { name: string; amount: number }[]
  >([]);
  const [pieChartData, setPieChartData] = useState<
    { name: string; value: number }[]
  >([]);
  const [barChartData, setBarChartData] = useState<
    { name: string; amount: number }[]
  >([]);
  const [yearlyPieChartData, setYearlyPieChartData] = useState<
    { name: string; value: number }[]
  >([]);

  useEffect(() => {
    if (userId) {
      dispatch(
        fetchExpensesGroupedByWeek({
          userId,
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        })
      );
      dispatch(
        fetchExpensesGroupedByCategory({
          userId,
          startDate: "2023-01-01",
          endDate: "2023-12-31",
        })
      );
      dispatch(
        fetchExpensesGroupedByMonth({
          userId,
          year: new Date().getFullYear(),
        })
      );
      dispatch(fetchExpensesGroupedByYear({ userId }));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (expensesGroupedByWeek) {
      const lineChartData = expensesGroupedByWeek.map(
        (week: any, index: number) => ({
          name: `Week ${index + 1}`,
          amount: week.total_amount,
        })
      );
      setChartData(lineChartData);
    }
  }, [expensesGroupedByWeek]);

  useEffect(() => {
    if (expensesGroupedByCategory) {
      const pieData = expensesGroupedByCategory.map((category: any) => ({
        name: category.category,
        value: category.total_amount,
      }));
      setPieChartData(pieData);
    }
  }, [expensesGroupedByCategory]);

  useEffect(() => {
    if (expensesGroupedByMonth) {
      const barData = expensesGroupedByMonth.map((month: any) => ({
        name: `Month ${month.month}`,
        amount: month.total_amount,
      }));
      setBarChartData(barData);
    }
  }, [expensesGroupedByMonth]);

  useEffect(() => {
    if (expensesGroupedByYear) {
      const yearlyPieData = expensesGroupedByYear.map((year: any) => ({
        name: `Year ${year.year}`,
        value: year.total_amount,
      }));
      setYearlyPieChartData(yearlyPieData);
    }
  }, [expensesGroupedByYear]);

  return (
    <div className="dashboard-charts">
      <h3>Expense Overview</h3>
      <div className="chart-container">
        <h4>Weekly Expenses</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-container">
        <h4>Expense Categories</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-container">
        <h4>Monthly Expenses</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-container">
        <h4>Yearly Expenses</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={yearlyPieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {yearlyPieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardContent;
