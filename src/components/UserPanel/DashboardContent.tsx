import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Row, Col, Card } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardContent: React.FC = () => {
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const tags = useSelector((state: RootState) => state.tags.tags);
  const recurringExpenses = useSelector(
    (state: RootState) => state.recurringExpenses.recurringExpenses
  );

  const data = expenses.map((expense) => ({
    name: expense.name,
    amount: expense.amount,
    date: new Date(expense.date).toLocaleDateString(),
  }));

  return (
    <div>
      <h3>Dashboard</h3>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Expenses Over Time">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Categories">{/* Add a chart for categories */}</Card>
        </Col>
        <Col span={12}>
          <Card title="Tags">{/* Add a chart for tags */}</Card>
        </Col>
        <Col span={12}>
          <Card title="Recurring Expenses">
            {/* Add a chart for recurring expenses */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;
