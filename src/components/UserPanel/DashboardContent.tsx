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
} from "recharts";
import "./User.css";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
}

const DashboardContent: React.FC<{ expenses: Expense[] }> = ({ expenses }) => {
  const [chartData, setChartData] = useState<
    { name: string; amount: number }[]
  >([]);
  const [pieChartData, setPieChartData] = useState<
    { name: string; value: number }[]
  >([]);

  useEffect(() => {
    // Simulating data fetching for the line chart
    const lineChartData = [
      { name: "Week 1", amount: 200 },
      { name: "Week 2", amount: 350 },
      { name: "Week 3", amount: 280 },
      { name: "Week 4", amount: 420 },
    ];
    setChartData(lineChartData);

    // Prepare data for the pie chart
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }));
    setPieChartData(pieData);
  }, [expenses]);

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
    </div>
  );
};

export default DashboardContent;
