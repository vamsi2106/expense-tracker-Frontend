import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  fetchExpensesGroupedByCategory,
  fetchExpensesGroupedByWeek,
  fetchExpensesGroupedByMonth,
  fetchExpensesGroupedByDate,
} from "../../store/slices/expenses/expenses.slice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Card, Col, Row, Typography, Select } from "antd";

const { Title } = Typography;
const { Option } = Select;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Mapping from month numbers to month names
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DashboardContent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [transactionType, setTransactionType] = useState("expense");

  // Get state from Redux
  const {
    expensesGroupedByCategory,
    expensesGroupedByWeek,
    expensesGroupedByMonth,
    expensesGroupedByDate,
    page_status,
    message,
  } = useSelector((state: RootState) => state.expenses);
  const { expenses } = useSelector((state: RootState) => state.expenses);

  // Fetch the userId from the user slice of the state
  const userId = useSelector((state: RootState) => state.user.userid);

  // Fetch grouped data on component mount
  useEffect(() => {
    if (userId) {
      dispatch(fetchExpensesGroupedByCategory(userId));
      dispatch(fetchExpensesGroupedByWeek(userId));
      dispatch(fetchExpensesGroupedByMonth(userId));
      dispatch(fetchExpensesGroupedByDate(userId));
    }
  }, [dispatch, userId]);

  if (page_status === "loading") {
    return <div>Loading data...</div>;
  }

  if (page_status === "failed") {
    return <div>Error loading data: {message}</div>;
  }

  // Prepare month data ensuring all months are included
  const monthData = monthNames.map((name, index) => {
    const existingMonth = expensesGroupedByMonth.find(
      (item: any) => item.month === index + 1
    );
    return {
      month: name,
      amount: existingMonth ? existingMonth.amount : 0, // Default to 0 if no data
    };
  });

  // Prepare week data, limiting to the first 4 weeks
  const weekData = expensesGroupedByWeek.slice(0, 4);

  // Filter expenses based on transaction type for the charts
  const filteredExpenses = expenses.filter(
    (item) => item.transaction_type === transactionType
  );

  // Pie chart data by category
  const pieData = filteredExpenses.reduce((acc: any[], item) => {
    const existingCategory = acc.find(
      (entry) => entry.category_name === item.category_name
    );
    if (existingCategory) {
      existingCategory.amount += item.amount;
    } else {
      acc.push({
        category_name: item.category_name,
        amount: item.amount,
      });
    }
    return acc;
  }, []);

  // Prepare line chart data by date
  const lineChartData = filteredExpenses.map((item) => ({
    date: item.date.split("T")[0], // format date to remove time
    amount: item.amount,
  }));

  return (
    <div className="dashboard-container">
      <Title level={1}>Dashboard</Title>

      {/* Transaction Type Toggle */}
      <Select
        defaultValue={transactionType}
        style={{ width: 120, marginBottom: 20 }}
        onChange={(value) => setTransactionType(value)}
      >
        <Option value="income">Income</Option>
        <Option value="expense">Expense</Option>
      </Select>

      <Row gutter={16}>
        {/* Expenses Pie Chart by Category */}
        <Col span={12}>
          <Card title={`Expenses by Category (${transactionType})`} bordered>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="amount"
                    nameKey="category_name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p>No data available for this transaction type.</p>
            )}
          </Card>
        </Col>

        {/* Expenses Line Chart by Date */}
        <Col span={12}>
          <Card title={`Expenses by Date (${transactionType})`} bordered>
            {lineChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="amount" stroke="#FF8042" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p>No data available for this transaction type.</p>
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Date-wise Expenses Line Chart */}
        <Col span={24}>
          <Card title="Expenses Grouped by Date" bordered>
            {expensesGroupedByDate.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={expensesGroupedByDate}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="amount" stroke="#FF8042" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p>No data available for date grouping.</p>
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Month-wise Expenses Bar Chart */}
        <Col span={12}>
          <Card title="Expenses Grouped by Month" bordered>
            {monthData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p>No data available for month grouping.</p>
            )}
          </Card>
        </Col>

        {/* Week-wise Expenses Bar Chart */}
        <Col span={12}>
          <Card title="Expenses Grouped by Week" bordered>
            {weekData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weekData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p>No data available for week grouping.</p>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;
