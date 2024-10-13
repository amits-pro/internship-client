import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const GrievanceStatus = () => {
  // State to hold the list of grievances and loading state
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch grievance data from an API when the component mounts
  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        // Example API call to fetch the grievance data
        const response = await fetch('/api/grievances/status'); // Adjust the API URL accordingly
        const data = await response.json();
        setGrievances(data); // Assuming data is an array of grievances
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error fetching grievances:', error);
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchGrievances();
  }, []);

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'submittedBy', headerName: 'Submitted By', width: 150 },
    { field: 'date', headerName: 'Date Submitted', type: 'date', width: 150 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={getStatusColor(params.value)} 
          variant="outlined"
        />
      ),
    },
  ];

  // Function to get chip color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'In Progress':
        return 'info';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Grievance Status - Banasthali Vidyapeeth
      </Typography>

      {/* Display loading spinner while data is being fetched */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ height: 400, width: '100%', padding: 2 }}>
          {/* DataGrid component to display grievance status */}
          <DataGrid
            rows={grievances}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
          />
        </Paper>
      )}
    </Box>
  );
};

export default GrievanceStatus;
