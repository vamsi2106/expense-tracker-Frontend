import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/user-panel/Navbar/navbar";
import { PageStatus } from "../../utils/pageStatus";
import { Welcome } from "../../components/user-panel/Welcome/welcome";
import { Loading } from "../../components/user-panel/Loading/loading";
import { Empty } from "../../components/user-panel/Empty/empty";
import { useSelector, useDispatch } from "react-redux";
import { fetchExpenses } from "../../store/expenses.slice";
import { HomeSuccessPage } from "../../components/user-panel/HomeSuccessPage/homeSuccessPage";
import { Error } from "../../components/user-panel/ErrorPage/error";
import { ExpenseModal } from "../../components/user-panel/ExpenseModel/expenseform.model";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import './home.css'; // Import the updated CSS file

export const ExpensesHome = () => {
  const pageStatusObject = new PageStatus();
  const [homePageStatus, setPageStatus] = useState(pageStatusObject.initial);
  const tabs = {
    files: "FILES",
    expenses: "EXPENSES",
  };

  const [tab, setTab] = useState<string>(tabs.expenses);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Redux hooks
  const dispatch = useDispatch();
  const { expenses, page_status } = useSelector((state: any) => state.expenses);
  console.log(page_status, expenses);

  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasFetchedData) {
        dispatch<any>(fetchExpenses()); 
        setPageStatus(pageStatusObject.loading);
        setHasFetchedData(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [dispatch, hasFetchedData, pageStatusObject]);

  useEffect(() => {
    if (page_status && homePageStatus !== page_status) {
      setPageStatus(page_status);
    }
  }, [page_status, homePageStatus]);

  const renderContent = () => {
    switch (homePageStatus) {
      case pageStatusObject.initial:
        return <Welcome />;
      case pageStatusObject.loading:
        return <Loading />;
      case pageStatusObject.empty:
        return <Empty />;
      case pageStatusObject.success:
        return <HomeSuccessPage tab={tab} />;
      case pageStatusObject.error:
        return <Error />;
      default:
        return null;
    }
  };

  const triggerModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const changeTab = (selectedTab: string) => setTab(selectedTab);

  return (
    <div>
      <Navbar />
      <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} style={{fontWeight: 'bold'}}>
            Track Your
          </Typography>
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
          >
            Files
          </Button>
          <Button 
            color="inherit" 
            onClick={() => changeTab(tabs.expenses)} 
            variant={tab === tabs.expenses ? "contained" : "outlined"}
            sx={{ 
              backgroundColor: tab === tabs.expenses ? "black" : "transparent", 
              color: tab === tabs.expenses ? "white" : "black", 
              border: tab === tabs.expenses ? "none" : "1px solid black", 
              marginRight: 2,
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                border: "1px solid black", // Keep border on hover
              }
            }}
          >
            Expense Details
          </Button>
          <Button variant="contained" color="secondary" onClick={triggerModal}>
            Add your Expense
          </Button>
        </Toolbar>
      </AppBar>
      <div>{renderContent()}</div>
      <ExpenseModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
