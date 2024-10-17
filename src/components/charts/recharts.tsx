import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { fetchExpensesGroupedByMonth } from "../../store/expenses.slice";
import { useDispatch } from "react-redux";
import { PageStatus } from "../../utils/pageStatus";
import { Loading } from "../user-panel/Loading/loading";

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
  const [chartData, setChartData] = useState<ChartData>({
    xAxisData: [],
    seriesData: [],
  });
  const [categoryPageStatus, setPageStatus] = useState<string>(
    pageStatusObject.initial
  );
  const dispatch = useDispatch();
  const userId = "yourUserId"; // Replace with the actual userId

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    setPageStatus(pageStatusObject.loading);
    let parameters =
      id === undefined ? { userId, year } : { userId, year, file_id: id };
    const response = await dispatch<any>(
      fetchExpensesGroupedByMonth(parameters)
    );

    if (fetchExpensesGroupedByMonth.fulfilled.match(response)) {
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
      trigger: "axis", // Show tooltip for axis
      formatter: (params: any) => {
        let result = `${params.name}<br/>`; // Month name
        params.forEach((item: any) => {
          result += `${item.seriesName}: ${item.value}<br/>`; // Series name and value
        });
        return result;
      },
    },
    xAxis: {
      type: "category",
      data: chartData.xAxisData,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Expenses", // Add name for tooltip display
        data: chartData.seriesData,
        type: "line",
        smooth: true, // Optional: for smooth lines
      },
    ],
  };

  const successOutput = () => (
    <div className="">
      <ReactECharts option={option} />
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
        return <p className="text-danger">Something went wrong</p>;
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
  };

  return (
    <div>
      <h2>Expenses Filtered by Months</h2>
      <label>Select Year</label>
      <select onChange={updateYear}>
        {years.map((item: number) => {
          if (item === new Date().getFullYear()) {
            return (
              <option key={item} value={item} selected>
                {item}
              </option>
            );
          }
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <button className="btn btn-primary" onClick={fetchResult}>
        Apply
      </button>
      {renderChart()}
    </div>
  );
};
