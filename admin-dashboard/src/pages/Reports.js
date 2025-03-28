import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const Reports = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'Monthly Sales Report',
      type: 'sales',
      status: 'submitted',
      date: '2024-01-15',
      description: 'Detailed analysis of January 2024 sales performance'
    },
    {
      id: 2,
      title: 'Inventory Status',
      type: 'inventory',
      status: 'draft',
      date: '2024-01-14',
      description: 'Current inventory levels and restock requirements'
    }
  ]);

  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    type: 'sales',
    description: '',
    status: 'draft'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newReport = {
        ...formData,
        id: reports.length + 1,
        date: new Date().toISOString().split('T')[0]
      };

      setReports([newReport, ...reports]);
      setOpenForm(false);
      setFormData({
        title: '',
        type: 'sales',
        description: '',
        status: 'draft'
      });
    } catch (err) {
      setError('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'success';
      case 'draft':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'sales':
        return 'primary';
      case 'inventory':
        return 'secondary';
      case 'expense':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Reports Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
        >
          Create Report
        </Button>
      </Box>

      {openForm && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            New Report
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Report Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    label="Report Type"
                  >
                    <MenuItem value="sales">Sales Report</MenuItem>
                    <MenuItem value="inventory">Inventory Report</MenuItem>
                    <MenuItem value="expense">Expense Report</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    label="Status"
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="submitted">Submit Now</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label="Report Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => setOpenForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Submit Report'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.title}</TableCell>
                <TableCell>
                  <Chip
                    label={report.type}
                    color={getTypeColor(report.type)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={report.status}
                    color={getStatusColor(report.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Reports;