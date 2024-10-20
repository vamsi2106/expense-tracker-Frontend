import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { fetchExpensesGroupedByMonth } from '../../store/expenses.slice';
import { useDispatch } from 'react-redux';
import { PageStatus } from '../../utils/pageStatus';
import { Loading } from '../user-panel/Loading/loading';
import { JsonToCsvDownloader } from '../ExpensesDashboard/JsonToCsvDownloader';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Card,
  CardContent,
  SelectChangeEvent
} from '@mui/material';

interface ChartData {
  xAxisData: string[];
  seriesData: number[];
}

interface ExpensesEChartProps {
  id?: string;
}

export const ExpensesEChart: React.FC<ExpensesEChartProps> = ({ id }) => {
  const pageStatusObject = new PageStatus();
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [chartData, setChartData] = useState<ChartData>({ xAxisData: [], seriesData: [] });
  const [categoryPageStatus, setPageStatus] = useState<string>(pageStatusObject.initial);
  const [resultExpenses, setExpenses] = useState<any[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    setPageStatus(pageStatusObject.loading);
    let parameters = id === undefined ? { year } : { year, id };
    const response = await dispatch<any>(fetchExpensesGroupedByMonth(parameters));

    if (fetchExpensesGroupedByMonth.fulfilled.match(response)) {
      const expenseData: any = response.payload;
      setExpenses(expenseData);
      if (expenseData && expenseData.length > 0) {
        updateTheChartData(expenseData);
      } else {
        setPageStatus(pageStatusObject.empty);
      }
    } else {
      setPageStatus(pageStatusObject.error);
    }
  };

  const updateTheChartData = (expenseData: any[]) => {
    let data: ChartData = { xAxisData: [], seriesData: [] };

    for (let i = 1; i <= 12; i++) {
      data.xAxisData.push(`Month ${i}`);
      data.seriesData.push(0);
    }

    expenseData.forEach((item: any) => {
      let month: number = item.month;
      data.seriesData[month - 1] = item.total_amount;
    });

    setChartData(data);
    setPageStatus(pageStatusObject.success);
  };

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        let result = `${params[0].name}<br/>`;
        params.forEach((item: any) => {
          result += `${item.seriesName}: ${item.value}<br/>`;
        });
        return result;
      },
    },
    xAxis: {
      type: 'category',
      data: chartData.xAxisData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Expenses',
        data: chartData.seriesData,
        type: 'line',
        smooth: true,
      },
    ],
  };

  const successOutput = () => (
    <Box>
      <ReactECharts option={option} />
      {resultExpenses && resultExpenses.length !== 0 && <JsonToCsvDownloader jsonData={resultExpenses} />}
    </Box>
  );

  const renderChart = () => {
    switch (categoryPageStatus) {
      case pageStatusObject.empty:
        return <Typography color="textSecondary">There are no existing expenses in the selected period</Typography>;
      case pageStatusObject.loading:
        return <Loading />;
      case pageStatusObject.success:
        return successOutput();
      case pageStatusObject.error:
        return <Typography color="error">Something went wrong</Typography>;
      default:
        return null;
    }
  };

  let years = [];
  let date = new Date();
  let currentYear = date.getFullYear();

  for (let start = 2000; start <= currentYear; start++) {
    years.push(start);
  }

  // Update the updateYear function to use SelectChangeEvent
  const updateYear = (event: SelectChangeEvent<number>) => {
    setYear(event.target.value as number);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Expenses Filtered by Months
        </Typography>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
          <InputLabel>Select Year</InputLabel>
          <Select value={year} onChange={updateYear} label="Select Year">
            {years.map((item: number) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={fetchResult}>
          Apply
        </Button>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

// export default ExpensesEChart;
