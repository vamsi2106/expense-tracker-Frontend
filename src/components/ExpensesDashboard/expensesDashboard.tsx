import { PieChart } from "recharts"
import ExpensesChart from "../charts/lineChart"
import { ExpensesEChart } from "../charts/recharts"
import { ExpensesVictoryChart } from "../charts/victoryChart"
import CategoryPieChart from "../charts/pieChart"

export const ExpensesDashboard = () => {
    return (
        <div>
            <div className="p-5 m-5 g-2">
                <ExpensesChart />
                <ExpensesEChart />
                <ExpensesVictoryChart />
                <CategoryPieChart/>
            </div>
        </div>
    )
}