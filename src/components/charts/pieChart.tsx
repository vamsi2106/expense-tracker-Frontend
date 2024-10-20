import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { fetchExpensesGroupedByCategory } from '../../store/expenses.slice';
import { useDispatch } from 'react-redux';
import { PageStatus } from '../../utils/pageStatus';
import { Loading } from '../user-panel/Loading/loading';
import { JsonToCsvDownloader } from '../ExpensesDashboard/JsonToCsvDownloader';
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Paper,
} from '@mui/material';

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartData {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }[];
}

interface PieChartProps {
    id?: string;
}

const CategoryPieChart: React.FC<PieChartProps> = ({ id }) => {
    let pageStatusObject = new PageStatus();
    const [startDate, setStartDate] = useState(() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date.toISOString().split('T')[0];
    });

    const [endDate, setEndDate] = useState(() => {
        const date = new Date();
        return date.toISOString().split('T')[0];
    });

    let [resultExpenses, setExpenses] = useState<any[]>([]);
    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
        }],
    });

    const [categoryPageStatus, setPageStatus] = useState<string>(pageStatusObject.initial);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchResult();
    }, []);

    const fetchResult = async () => {
        setPageStatus(pageStatusObject.loading);
        let parameters = id === undefined ? { startDate, endDate } : { startDate, endDate, id };
        const response = await dispatch<any>(fetchExpensesGroupedByCategory(parameters));

        if (fetchExpensesGroupedByCategory.fulfilled.match(response)) {
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
        const bgColors = [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
        ];

        const data: ChartData = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
            }],
        };

        expenseData.forEach((item: any, index: number) => {
            data.labels.push(item.category);
            data.datasets[0].data.push(item.total_amount);
            data.datasets[0].backgroundColor.push(bgColors[index % bgColors.length]);
            data.datasets[0].borderColor.push(bgColors[index % bgColors.length]);
        });

        setChartData(data);
        setPageStatus(pageStatusObject.success);
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // This ensures that the chart can fit into the container without stretching
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => {
                        const dataset = tooltipItem.dataset;
                        const currentValue = dataset.data[tooltipItem.dataIndex];
                        return `${dataset.label}: $${currentValue}`;
                    },
                },
            },
        },
    };

    const updateStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value);
    };

    const updateEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.target.value);
    };

    const successOutput = () => (
        <Box sx={{ height: '50vh', width: '50vw', position: 'relative' }}>
            <Pie data={chartData} options={options} />
            {resultExpenses && resultExpenses.length !== 0 && <JsonToCsvDownloader jsonData={resultExpenses} />}
        </Box>
    );

    const renderChart = () => {
        switch (categoryPageStatus) {
            case pageStatusObject.empty:
                return <Typography color="error">There are no existing expenses in the selected period</Typography>;
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

    return (
        <Paper elevation={3} sx={{ padding: 3, width: '50vw', height: '80vh' }}>
            <Typography variant="h4" gutterBottom>
                Expenses Filtered by Category
            </Typography>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        type="date"
                        label="Select Starting Date"
                        onChange={updateStartDate}
                        value={startDate}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        type="date"
                        label="Select Ending Date"
                        onChange={updateEndDate}
                        value={endDate}
                    />
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={fetchResult}>
                Apply
            </Button>
            {renderChart()}
        </Paper>
    );
};

export default CategoryPieChart;
