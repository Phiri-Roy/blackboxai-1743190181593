import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import KanbanBoard from '../components/KanbanBoard';

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Project Progress
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: 2, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h3">
              2
            </Typography>
            <Typography variant="subtitle1">
              To Do
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: 2, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ff9800 0%, #ffc107 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h3">
              1
            </Typography>
            <Typography variant="subtitle1">
              In Progress
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: 2, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h3">
              1
            </Typography>
            <Typography variant="subtitle1">
              Done
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: 2, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #9c27b0 0%, #e040fb 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h3">
              4
            </Typography>
            <Typography variant="subtitle1">
              Total Tasks
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper 
        sx={{ 
          p: 0, 
          overflow: 'hidden',
          bgcolor: 'background.default',
          boxShadow: 'none'
        }}
      >
        <KanbanBoard />
      </Paper>
    </Box>
  );
};

export default Dashboard;