import React, { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip } from 'victory';
import { fetchExpensesGroupedByWeek } from '../../store/expenses.slice';
import { useDispatch } from 'react-redux';
import { PageStatus } from '../../utils/pageStatus';
import { Loading } from '../Loading/loading';

interface ChartData {
  week: string;
  amount: number;
}

interface ExpensesVictoryChartProps {
  id?:string;
}

export const ExpensesVictoryChart: React.FC<ExpensesVictoryChartProps> = ({id}) => {
  const pageStatusObject = new PageStatus();
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(() => new Date().getMonth()+1);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [categoryPageStatus, setPageStatus] = useState<string>(pageStatusObject.initial);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    setPageStatus(pageStatusObject.loading);
    let parameters = id===undefined ? { month, year } : { month, year, id };
    const response = await dispatch<any>(fetchExpensesGroupedByWeek(parameters));

    if (fetchExpensesGroupedByWeek.fulfilled.match(response)) {
      const expenseData: any = response.payload;

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
    let data: ChartData[] = [];

    for (let i = 1; i <= 4; i++) {
      data.push({ week: `Week ${i}`, amount: 20 }); // Default amount is set to 20
    }

    expenseData.forEach((item: any) => {
      data[item.week - 1].amount = item.total_amount;
    });

    // Set amount to defaultAmount if it is 0
    data = data.map((item) => ({
      week: item.week,
      amount: item.amount === 0 ? 20 : item.amount,
       // Keep defaultAmount for reference
    }));
console.log(data);
    setChartData(data);
    setPageStatus(pageStatusObject.success);
  };

  const successOutput = () => (
    <div>
      <VictoryChart domainPadding={20}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={['Week 1', 'Week 2', 'Week 3', 'Week 4']}
        />
        <VictoryAxis dependentAxis />
        <VictoryBar
          data={chartData}
          x="week"
          y="amount" // Use updated amount, which defaults to defaultAmount if original was 0
          labels={({ datum }) => {
            let amount = datum.amount===20? 0 : datum.amount;
            return `Week: ${datum.week}\nAmount: ${amount}`}}
          labelComponent={<VictoryTooltip />}
          style={{
            data: {
              fill: ({ datum }) => (datum.amount > 20 ? "green" : "voilet"), // Color based on value
              width: 20,
              opacity: ({ datum }) => (datum.amount > 0 ? 1 : 0.5), // Change opacity for 0 values
            },
          }}
        />
      </VictoryChart>
      <p>Success</p>
    </div>
  );

  const renderChart = () => {
    switch (categoryPageStatus) {
      case pageStatusObject.empty:
        return <p>There are no existing expenses in the selected period</p>;
      case pageStatusObject.loading:
        return <Loading />;
      case pageStatusObject.success:
        return successOutput();
      case pageStatusObject.error:
        return <p className='text-danger'>Something went wrong</p>;
      default:
        return null;
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => 2000 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const updateYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value));
  };

  const updateMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(event.target.value));
  };

  return (
    <div>
      <h2>Expenses Filtered by Months</h2>
      <label>Select Year</label>
      <select onChange={updateYear}>
        {years.map((item: number) => (
          <option key={item} value={item} selected={item === year}>{item}</option>
        ))}
      </select>
      <label>Select Month</label>
      <select onChange={updateMonth}>
        {months.map((item: number) => (
          <option key={item} value={item} selected={item === month}>{item}</option>
        ))}
      </select>
      <button className='btn btn-primary' onClick={fetchResult}>Apply</button>
      {renderChart()}
    </div>
  );
};
