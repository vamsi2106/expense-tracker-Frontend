import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { fetchExpensesGroupedByCategory } from '../../store/expenses.slice';
import { useDispatch } from 'react-redux';
import { PageStatus } from '../../utils/pageStatus';
import { Loading } from '../user-panel/Loading/loading';


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

interface PieChartProps{
    id?:string;
}

const CategoryPieChart: React.FC<PieChartProps> = ({id}) => {
    let pageStatusObject = new PageStatus();
    console.log('pie chsrt');
    const [startDate, setStartDate] = useState(() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date.toISOString().split('T')[0];
    });

    const [endDate, setEndDate] = useState(() => {
        const date = new Date();
        return date.toISOString().split('T')[0];
    });

    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
        }]
    });

    const [categoryPageStatus, setPageStatus] = useState<string>(pageStatusObject.initial);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchResult();
    }, []);

    const fetchResult = async () => {
        setPageStatus(pageStatusObject.loading);
        let parameters = id===undefined ? { startDate, endDate } :{ startDate, endDate , id}
        const response = await dispatch<any>(fetchExpensesGroupedByCategory(parameters));

        if (fetchExpensesGroupedByCategory.fulfilled.match(response)) {
            const expenseData:any = response.payload;

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
            }]
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
        <div className='pie-chart'>
            <Pie data={chartData} options={options} />
        </div>
    );

    const renderChart = () => {
        switch (categoryPageStatus) {
            case pageStatusObject.empty:
                return <p>There are no existing expenses in the selected period</p>;
            case pageStatusObject.loading:
                return <Loading/>;
            case pageStatusObject.success:
                return successOutput();
            case pageStatusObject.error:
                return <p className='text-danger'>Something went wrong</p>;
            default:
                return null;
        }
    };

    return (
        <div>
            <h2>Expenses filterd by Category</h2>
            <label>Select Starting Date</label>
            <input type='date' onChange={updateStartDate} value={startDate} />
            <label>Select Ending Date</label>
            <input type='date' onChange={updateEndDate} value={endDate} />
            <button className='btn btn-primary' onClick={fetchResult}>Apply</button>

            {renderChart()}
        </div>
    );
};

export default CategoryPieChart;
