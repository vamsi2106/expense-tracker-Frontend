import React, { useState } from "react";
import {
  User,
  FileIcon,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import * as recharts from "recharts";
import { Cell, Legend, Line, Pie, Tooltip, YAxis } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const DashboardCharts = () => {
  const [chartData, setChartData] = useState<
    { name: string; total_amount: number }[]
  >([]);

  const [pieChartData, setPieChartData] = useState<
    { name: string; value: number }[]
  >([]);

  return (
    <div>
      <div className="dashboard-charts">
        <h2>Expense Overview</h2>
        <div className="chart-container">
          <h3>Weekly Expenses</h3>
          <recharts.ResponsiveContainer width="100%" height={300}>
            <recharts.LineChart data={chartData}>
              <recharts.CartesianGrid strokeDasharray="3 3" />
              <recharts.XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total_amount" stroke="#8884d8" />
            </recharts.LineChart>
          </recharts.ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h3>Expense Categories</h3>
          <recharts.ResponsiveContainer width="100%" height={300}>
            <recharts.PieChart>
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
            </recharts.PieChart>
          </recharts.ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
