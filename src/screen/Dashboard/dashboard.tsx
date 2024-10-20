import { useState } from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Navbar } from "../../components/user-panel/Navbar/navbar";
import { ExpensesDashboard } from "../../components/ExpensesDashboard/expensesDashboard";
import { FilesDashboard } from "../../components/ExpensesDashboard/filesDashboard";
import ExpensesChart from "../../../src/components/charts/lineChart";
import { ExpensesEChart } from "../../../src/components/charts/recharts";
import { ExpensesVictoryChart } from "../../../src/components/charts/victoryChart";
import CategoryPieChart from "../../../src/components/charts/pieChart";
import './dashboard.css';

export const Dashboard = () => {
  const tabs = {
    files: "FILES",
    expenses: "EXPENSES",
    lineChart: "LINE_CHART",
    eChart: "E_CHART",
    victoryChart: "VICTORY_CHART",
    pieChart: "PIE_CHART",
  };

  const [tab, setTab] = useState<string>(tabs.expenses);

  const changeTab = (existingTab: string) => {
    setTab(existingTab);
  };

  const renderDashboard = () => {
    switch (tab) {
      case tabs.expenses:
        return <ExpensesDashboard />;
      case tabs.files:
        return <FilesDashboard />;
      case tabs.lineChart:
        return <ExpensesChart />;
      case tabs.eChart:
        return <ExpensesEChart />;
      case tabs.victoryChart:
        return <ExpensesVictoryChart />;
      case tabs.pieChart:
        return <CategoryPieChart />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar /> {/* Keeping Navbar included */}
      <AppBar position="static" color="default" className="appbar" elevation={5}>
        <Toolbar className="toolbar">
          <Button
            color="inherit"
            onClick={() => changeTab(tabs.files)}
            variant={tab === tabs.files ? "contained" : "outlined"}
            sx={{
              backgroundColor: tab === tabs.files ? "black" : "transparent",
              color: tab === tabs.files ? "white" : "black",
              border: tab === tabs.files ? "none" : "1px solid black",
              marginRight: 2,
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                border: "1px solid black", // Keep border on hover
              }
            }}
            className={`tab-button me-3 ${tab === tabs.files ? "active-tab" : ""}`}
          >
            Files
          </Button>
          <Button
            className={`tab-button ${tab === tabs.expenses ? "active-tab" : ""}`}
            onClick={() => changeTab(tabs.expenses)}
          >
            Expense Details
          </Button>
          <Button
            className={`tab-button ${tab === tabs.lineChart ? "active-tab" : ""}`}
            onClick={() => changeTab(tabs.lineChart)}
          >
            Line Chart
          </Button>
          <Button
            className={`tab-button ${tab === tabs.eChart ? "active-tab" : ""}`}
            onClick={() => changeTab(tabs.eChart)}
          >
            E Chart
          </Button>
          <Button
            className={`tab-button ${tab === tabs.victoryChart ? "active-tab" : ""}`}
            onClick={() => changeTab(tabs.victoryChart)}
          >
            Victory Chart
          </Button>
          <Button
            className={`tab-button ${tab === tabs.pieChart ? "active-tab" : ""}`}
            onClick={() => changeTab(tabs.pieChart)}
          >
            Pie Chart
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 2 }}>{renderDashboard()}</Box>
    </div>
  );
};
