// import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip } from 'victory';

// const data = [
//   { week: 'Week 1', amount: 4000 },
//   { week: 'Week 2', amount: 3000 },
//   { week: 'Week 3', amount: 2000 },
//   { week: 'Week 4', amount: 2780 },
// ];

// export const ExpensesVictoryChart = () => (
//   <VictoryChart domainPadding={20}>
//     <VictoryAxis
//       tickValues={[1, 2, 3, 4]}
//       tickFormat={['Week 1', 'Week 2', 'Week 3', 'Week 4']}
//     />
//     <VictoryBar
//       data={data}
//       x="week"
//       y="amount"
//       labels={({ datum }) => `Week: ${datum.week}\nAmount: ${datum.amount}`} // Tooltip content
//       labelComponent={<VictoryTooltip />} // Enable tooltips
//       style={{
//         data: {
//           fill:  "green", // Change fill color based on value
//           width: 20, // Bar width
//         },
//       }}
//     />
//   </VictoryChart>
// );


import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { fetchExpensesGroupedByMonth, fetchExpensesGroupedByWeek } from '../../store/expenses.slice';
import { useDispatch } from 'react-redux';
import { PageStatus } from '../../utils/pageStatus';
import { Loading } from '../Loading/loading';

interface ChartData {
  week: string,
  amount: number
}

export const ExpensesVictoryChart: React.FC = () => {
  const pageStatusObject = new PageStatus();
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [categoryPageStatus, setPageStatus] = useState<string>(pageStatusObject.initial);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    setPageStatus(pageStatusObject.loading);
    const response = await dispatch<any>(fetchExpensesGroupedByWeek({ month, year }));

    if (fetchExpensesGroupedByWeek.fulfilled.match(response)) {
      const expenseData: any = response.payload;

      if (expenseData && expenseData.length > 0) {
        updateTheChartData(expenseData);
        console.log(expenseData);
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
      data.push({ week: `Week ${i}`, amount: 0 });
    }
    console.log(data);

    expenseData.forEach((item: any) => {
      data[item.week - 1].amount = item.total_amount;
    });

    setChartData(data);
    console.log(data)
    setPageStatus(pageStatusObject.success);
  };

  // const option = {
  //   tooltip: {
  //     trigger: 'axis', // Show tooltip for axis
  //     formatter: (params: any) => {
  //       let result = `${params[0].name}<br/>`; // Month name
  //       params.forEach((item: any) => {
  //         result += `${item.seriesName}: ${item.value}<br/>`; // Series name and value
  //       });
  //       return result;
  //     }
  //   },
  //   xAxis: {
  //     type: 'category',
  //     data: chartData.xAxisData,
  //   },
  //   yAxis: {
  //     type: 'value',
  //   },
  //   series: [
  //     {
  //       name: 'Expenses', // Add name for tooltip display
  //       data: chartData.seriesData,
  //       type: 'line',
  //       smooth: true, // Optional: for smooth lines
  //     },
  //   ],
  // };

  const successOutput = () => (
    <div className=''>
      <VictoryChart domainPadding={20}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={['Week 1', 'Week 2', 'Week 3', 'Week 4']}
        />
        <VictoryBar
          data={chartData}
          x="week"
          y="amount"
          labels={({ datum }) => `Week: ${datum.week}\nAmount: ${datum.amount}`} // Tooltip content
          labelComponent={<VictoryTooltip />} // Enable tooltips
          style={{
            data: {
              fill: "green", // Change fill color based on value
              width: 20, // Bar width
            },
          }}
        />
      </VictoryChart>
      <p>success</p>
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

  let years = [];
  let date = new Date();
  let currentYear = date.getFullYear();

  for (let start = 2000; start <= currentYear; start++) {
    years.push(start);
  }

  const updateYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value));
  }

   const updateMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(event.target.value));
  }

  let months = [];
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }

  return (
    <div>
      <h2>Expenses Filtered by Months</h2>
      <label>Select Year</label>
      <select onChange={updateYear}>
        {years.map((item: number) => {
          if (item === new Date().getFullYear()) {
            return <option key={item} value={item} selected>{item}</option>
          }
          return (
            <option key={item} value={item}>{item}</option>
          )
        })}
      </select>
      <label>Select Month</label>
      <select onChange={updateMonth}>
        {
          months.map((item: number) => {
            let date = new Date();
            let month = date.getMonth();
            if (item === month) {
              return <option value={item} selected>{item}</option>
            }
            return <option value={item}>{item}</option>
          })}
      </select>
      <button className='btn btn-primary' onClick={fetchResult}>Apply</button>
      {renderChart()}
    </div>
  );
};

// export default ExpensesEChart;
