import { useEffect, useState } from "react";
import { PageStatus } from "../../utils/pageStatus";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiles } from "../../store/files.slice";
import { Empty } from "../user-panel/Empty/empty";
import ExpensesChart from "../charts/lineChart";
import { ExpensesEChart } from "../charts/recharts";
import { ExpensesVictoryChart } from "../charts/victoryChart";
import CategoryPieChart from "../charts/pieChart";

import { 
    Box, 
    Button, 
    Typography, 
    Paper, 
    Divider, 
    Grid
} from "@mui/material";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export const FilesDashboard = () => {
  let pageStatusObject = {
    select: 'SELECT',
    display: 'DISPLAY'
  };
  const [filesDashboardStatus, setFilesDashboard] = useState(pageStatusObject.select);
  let [id, setId] = useState<string>();
  let dispatch = useDispatch();
  let { files } = useSelector((state: any) => state.files);

  useEffect(() => {
    dispatch<any>(fetchFiles());
  }, [dispatch]);

  const updateSelectFile = () => {
    let status = filesDashboardStatus === pageStatusObject.select ? pageStatusObject.display : pageStatusObject.select;
    setFilesDashboard(status);
  };

  const viewChartsPage = (id: string) => {
    setId(id);
    updateSelectFile();
  };

  const selectFile = () => {
    return (
      <Box sx={{ p: 3 }}>
        {files.length === 0 ? (
          <Empty />
        ) : (
          <Grid container spacing={2}>
            {files.map((item: any) => (
              <Grid item xs={12} md={4} key={item.id}>
                <Paper elevation={2} sx={{ p: 2, textAlign: "center", cursor: "pointer" }} onClick={() => viewChartsPage(item.id)}>
                  <InsertDriveFileIcon fontSize="large" sx={{ color: "#1976d2" }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {item.originalFileName}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    );
  };

  const displayCharts = () => {
    return (
      <Box sx={{ p: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ExpensesChart id={id} />
          </Grid>
          <Grid item xs={12}>
            <ExpensesEChart id={id} />
          </Grid>
          <Grid item xs={12}>
            <ExpensesVictoryChart id={id} />
          </Grid>
          <Grid item xs={12}>
            <CategoryPieChart id={id} />
          </Grid>
        </Grid>
      </Box>
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
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        File Dashboard
      </Typography>
      <Button 
        onClick={updateSelectFile} 
        variant="contained" 
        color="primary" 
        startIcon={<FolderOpenIcon />}
        sx={{ mb: 2 }}
      >
        Choose File
      </Button>
      <Divider sx={{ mb: 3 }} />
      {renderFilesDashboard()}
    </Box>
  );
};
