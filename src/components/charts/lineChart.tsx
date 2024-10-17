// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from 'recharts';
// import { fetchExpensesGroupedByDate } from '../../store/expenses.slice';

// interface DataPoint {
//   name: string;
//   total_amount: number;
// }

// const data: DataPoint[] = [
//   { name: 'Week 1', total_amount: 4000 },
//   { name: 'Week 2', total_amount: 3000 },
//   { name: 'Week 3', total_amount: 2000 },
//   { name: 'Week 4', total_amount: 2780 },
// ];

// const ExpensesChart: React.FC = () => {
//   let dispatch = useDispatch();
//   let {expensesFilterdByDay,expenses} = useSelector((state:any)=>state.expenses);
//   console.log(expensesFilterdByDay);
//   //dispatch<any>(fetchExpensesGroupedByDate({offset:0}));
//   let [offsetValue,setOffsetValue] = useState<number>(0);
  
//   useEffect(()=>{
//     console.log('component mounted');
//     fetchResult(0);
//   },[dispatch])

//   const fetchResult = async (offset:number)=>{
//     await dispatch<any>(fetchExpensesGroupedByDate({offset}))
//   }
  
//   let increaseOffset = ()=>{
//     if(offsetValue < parseInt(expenses.length/7)){
//       setOffsetValue(offsetValue+1);
//     }
//   } 

//   let decreaseOffset = ()=>{
//     if(offsetValue > 0){
//       setOffsetValue(offsetValue-1);
//     }
//   }

//   return(
//     <div>
//       <h2>Last 7 days expenses</h2>
//   <ResponsiveContainer width="80%" height={400}>
    
//     <LineChart data={data}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Line type="monotone" dataKey="total_amount" stroke="#8884d8" />
//     </LineChart>
//   </ResponsiveContainer>
//     </div>
// );
// }

// export default ExpensesChart;


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { fetchExpensesGroupedByDate } from '../../store/expenses.slice';
import './chart.css'
interface DataPoint {
  name: string; // Should be the formatted date
  total_amount: number; // Should be the total amount
}

const ExpensesChart: React.FC = () => {
  const dispatch = useDispatch();
  const { expensesFilteredByDay, expenses } = useSelector((state: any) => state.expenses);
  
  const [offsetValue, setOffsetValue] = useState<number>(0);
  const [chartData, setChartData] = useState<DataPoint[]>([]);

  useEffect(() => {
    console.log('component mounted');
    fetchResult(offsetValue);
  }, [dispatch, offsetValue]);

  const fetchResult = async (offset: number) => {
    const response = await dispatch<any>(fetchExpensesGroupedByDate({ offset }));
    if (response.meta.requestStatus === 'fulfilled') {
      //formatChartData(response.payload);
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
            updatedData.push({ name: "YYYY-MM-DD", total_amount: 0 });
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
      setOffsetValue(prev => prev + 1);
      fetchResult(offsetValue+1);
    }
  };

  const decreaseOffset = () => {
    if (offsetValue > 0) {
      setOffsetValue(prev => prev - 1);
      fetchResult(offsetValue-1);
    }
  };

  return (
    <div>
      <h2>Last 7 days expenses</h2>
      <div className='align-between'>
        <button onClick={increaseOffset} className='btn btn-primary'>Prev</button>
        <button onClick={decreaseOffset} className='btn btn-primary'>Next</button>
      </div>
      <ResponsiveContainer width="80%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_amount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    
    </div>
  );
};

export default ExpensesChart;
