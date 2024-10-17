import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiles } from "../../store/files.slice";
import ExpensesChart from "../charts/lineChart";
import { ExpensesEChart } from "../charts/recharts";
import { ExpensesVictoryChart } from "../charts/victoryChart";
import CategoryPieChart from "../charts/pieChart";

export const FilesDashboard = () => {
  let pageStatusObject = {
    select: "SELECT",
    display: "DISPLAY",
  };
  const [filesDashboardStatus, setFilesDashboard] = useState(
    pageStatusObject.select
  );
  let [id, setId] = useState<string>();
  let dispatch = useDispatch();
  let { files } = useSelector((state: any) => state.files);
  const userId = "yourUserId"; // Replace with the actual userId

  console.log(files);

  useEffect(() => {
    dispatch<any>(fetchFiles({ userId }));
  }, [dispatch, userId]);

  const updateSelectFile = () => {
    let status =
      filesDashboardStatus === pageStatusObject.select
        ? pageStatusObject.display
        : pageStatusObject.select;
    setFilesDashboard(status);
  };

  console.log(filesDashboardStatus);

  const viewChartsPage = (id: string) => {
    setId(id);
    updateSelectFile();
  };

  const selectFile = () => {
    return (
      <div>
        {files.length === 0 ? (
          <p>Empty</p>
        ) : (
          files.map((item: any) => (
            <div key={item.id} className="m-2">
              <h4 onClick={() => viewChartsPage(item.id)}>
                {item.originalFileName}
              </h4>
            </div>
          ))
        )}
      </div>
    );
  };

  const displayCharts = () => {
    return (
      <div>
        <div className="p-5 m-5 g-2">
          <ExpensesChart id={id} />
          <ExpensesEChart id={id} />
          <ExpensesVictoryChart id={id} />
          <CategoryPieChart id={id} />
        </div>
      </div>
    );
  };

  const renderFilesDashboard = () => {
    switch (filesDashboardStatus) {
      case pageStatusObject.select:
        return selectFile();
      case pageStatusObject.display:
        return displayCharts();
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>It is files page</h1>
      <button onClick={updateSelectFile} className="btn btn-primary">
        Choose file
      </button>
      {renderFilesDashboard()}
    </div>
  );
};
