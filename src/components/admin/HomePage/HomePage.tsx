import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/index";

import { Card, Row, Col, Statistic, Progress } from "antd";
import { Box, Typography } from "@mui/material";
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
import "./Home.css";
import { fetchUsers } from "../../../store/slices/user/usersListSlice";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.usersList
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const userCount = users.length;

  // Prepare data for the graph
  const today = new Date();
  const lastWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date.toLocaleDateString();
  }).reverse();

  const dailyData = lastWeek.map((date) => ({
    date,
    count: users.filter(
      (user: any) => new Date(user.createdAt).toLocaleDateString() === date
    ).length,
  }));

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin Home Page
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Row gutter={16}>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "0.5px solid grey",
          }}
        >
          <Card bordered={false}>
            <Statistic
              title="Total Users Registered"
              value={userCount}
              valueStyle={{ color: "#3f8600" }}
              prefix={
                <Progress
                  type="circle"
                  percent={100}
                  format={() => userCount}
                />
              }
            />
          </Card>
        </Col>
        <Col
          span={12}
          style={{
            border: "0.5px solid grey",
          }}
        >
          <Card title="User Registration Over the Past Week" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </Box>
  );
};

export default HomePage;
