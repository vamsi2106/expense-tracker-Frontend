import { useState } from "react";
import { Navbar } from "../../components/Navbar/navbar";
import ExpensesChart from "../../components/charts/lineChart";
import { ExpensesEChart } from "../../components/charts/recharts";
import { ExpensesVictoryChart } from "../../components/charts/victoryChart";
//import PieChart from "../../components/charts/pieChart";
import { ExpensesDashboard } from "../../components/ExpensesDashboard/expensesDashboard";
import { FilesDashboard } from "../../components/ExpensesDashboard/filesDashboard";

export const Dashboard = () => {
    const tabs = {
        files: 'FILES',
        expenses: 'EXPENSES'
    }

    const [tab, setTab] = useState<string>(tabs.expenses);
    const changeTab = (existingTab: string) => {
        setTab(existingTab);
    }

    const renderDashboard = () => {
        switch(tab){
            case tabs.expenses:
                return <ExpensesDashboard/>
            case tabs.files:
                return <FilesDashboard/>
            default:
                return null;
        }
    }
    return (
        <div>
            <Navbar />
            <nav className="navbar bg-light shadow p-3 d-flex gap-2">
                <div className="d-flex gap-1">
                    <h5 onClick={() => changeTab(tabs.files)}><b>Files</b></h5>
                    <h5 onClick={() => changeTab(tabs.expenses)}><b className="px-4">Expense Details</b></h5>
                </div>
            </nav>

            {renderDashboard()}
        </div>
    )
};
