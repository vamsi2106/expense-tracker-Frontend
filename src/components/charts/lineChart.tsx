import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Recharts for LineChart
import { fetchExpensesGroupedByDate } from '../../store/expenses.slice';
import { Card, CardContent, CardActions, Grid, Typography, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { JsonToCsvDownloader } from '../ExpensesDashboard/JsonToCsvDownloader';

interface DataPoint {
  name: string; // Should be the formatted date
  total_amount: number; // Should be the total amount
}

interface ExpensesChartsProps {
  id?: string;
}

const ExpensesChart: React.FC<ExpensesChartsProps> = ({ id }) => {
  const dispatch = useDispatch();
  const { expensesFilteredByDay, expenses } = useSelector((state: any) => state.expenses);
  let [resultExpenses, setExpenses] = useState<any[]>([]);
  const [offsetValue, setOffsetValue] = useState<number>(0);
  const [chartData, setChartData] = useState<DataPoint[]>([]);

  useEffect(() => {
    fetchResult(offsetValue);
  }, [dispatch, offsetValue]);

  const fetchResult = async (offset: number) => {
    const response = await dispatch<any>(fetchExpensesGroupedByDate({ offset, file_id: id }));
    if (response.meta.requestStatus === 'fulfilled') {
      setExpenses(response.payload);
      formattedData(response.payload);
    }
  };

  const formattedData = (data: any[]) => {
    let dataLength = data.length;
    let length = 7 - dataLength;
    let updatedData: { name: string; total_amount: number }[] = [];

    // Add placeholders for missing data
    if (length > 0) {
      for (let i = 0; i < length; i++) {
        updatedData.push({ name: 'YYYY-MM-DD', total_amount: 0 });
      }
    }

    // Add actual data items to updatedData
    for (let dataItem of data) {
      updatedData.push({ name: dataItem.date, total_amount: dataItem.total_amount });
    }

    setChartData(updatedData);
  };

  const increaseOffset = () => {
    if (offsetValue < Math.ceil(expenses.length / 7) - 1) {
      setOffsetValue((prev) => prev + 1);
      fetchResult(offsetValue + 1);
    }
  };

  const decreaseOffset = () => {
    if (offsetValue > 0) {
      setOffsetValue((prev) => prev - 1);
      fetchResult(offsetValue - 1);
    }
  };

  return (
    <Card sx={{ margin: '20px', padding: '20px' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Last 7 Days Expenses
        </Typography>

        <Grid container justifyContent="space-between" alignItems="center">
          <IconButton onClick={decreaseOffset} color="primary">
            <ArrowBack />
          </IconButton>
          <IconButton onClick={increaseOffset} color="primary">
            <ArrowForward />
          </IconButton>
        </Grid>

        {/* Recharts LineChart */}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>

      </CardContent>

      {resultExpenses && resultExpenses.length !== 0 && (
        <CardActions>
          <JsonToCsvDownloader jsonData={resultExpenses} />
        </CardActions>
      )}
    </Card>
  );
};

export default ExpensesChart;
