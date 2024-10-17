import { useState } from "react";
import { Navbar } from "../../components/user-panel/Navbar/navbar";

export const Dashboard = () => {
  const tabs = {
    files: "FILES",
    expenses: "EXPENSES",
  };

  const [tab, setTab] = useState<string>(tabs.expenses);
  const changeTab = (existingTab: string) => {
    setTab(existingTab);
  };
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
      </nav>
    </div>
  );
};
