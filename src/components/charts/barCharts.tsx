import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Expenses',
      data: [4000, 3000, 2000, 2780],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};

export const ExpensesBarChart = () => (
  <div>
    <Bar data={data} />
  </div>
);
