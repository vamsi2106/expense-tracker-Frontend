import React, { useState, useEffect } from "react";
Navbar;

import { useSelector, useDispatch } from "react-redux";
import { fetchExpenses } from "../../../store/expenses.slice";
import { Navbar } from "../../user-panel/Navbar/navbar";
import { PageStatus } from "../../../utils/pageStatus";
import { Welcome } from "../../user-panel/Welcome/welcome";
import Loading from "../../charts/Loading";
import { Empty } from "../../user-panel/Empty/empty";
import { Error } from "../../user-panel/ErrorPage/error";
import { ExpenseModal } from "../../user-panel/ExpenseModel/expenseform.model";
import { HomeSuccessPage } from "../../user-panel/HomeSuccessPage/homeSuccessPage";

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
  // Flag to control if expenses have been fetched already
  const [hasFetchedData, setHasFetchedData] = useState(false);

  // Show the initial status (welcome screen) for 4 seconds before fetching data
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasFetchedData) {
        // Only fetch data once
        dispatch<any>(fetchExpenses()); // Fetch expenses after 4 seconds
        setPageStatus(pageStatusObject.loading); // Set to loading while fetching data
        setHasFetchedData(true); // Mark data as fetched
      }
    }, 4000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [dispatch, hasFetchedData, pageStatusObject]);

  // Update the page status after the data is fetched and `page_status` changes
  useEffect(() => {
    if (page_status && homePageStatus !== page_status) {
      setPageStatus(page_status); // Update local state when `page_status` is available
    }
  }, [page_status, homePageStatus]);

  // Function to render content based on current status
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
  const changeTab = (selectedTab: string) => {
    setTab(selectedTab);
  };

  console.log(tab);
  return (
    <div>
      <Navbar />
      <nav className="navbar bg-light shadow p-3 d-flex gap-2">
        <div className="d-flex gap-1">
          <h5 onClick={() => changeTab(tabs.files)}>
            <b>Files</b>
          </h5>
          <h5 onClick={() => changeTab(tabs.expenses)}>
            <b className="px-4">Expense Details</b>
          </h5>
        </div>
        <div>
          <button className="btn btn-primary" onClick={triggerModal}>
            Add your Expense
          </button>
        </div>
      </nav>
      <div className="align-center-to-the-page">{renderContent()}</div>
      <ExpenseModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
