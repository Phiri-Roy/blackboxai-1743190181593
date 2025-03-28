import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Chip,
  Stack,
  Snackbar
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const DailyScrum = () => {
  const [scrums, setScrums] = useState([
    {
      id: 1,
      date: '2024-01-15',
      yesterday: 'Completed user authentication implementation',
      today: 'Working on API integration',
      blockers: 'None',
      status: 'submitted'
    },
    {
      id: 2,
      date: '2024-01-14',
      yesterday: 'Set up project structure',
      today: 'Starting user authentication',
      blockers: 'Waiting for API credentials',
      status: 'submitted'
    }
  ]);

  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    yesterday: '',
    today: '',
    blockers: 'None'
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

      const newScrum = {
        ...formData,
        id: scrums.length + 1,
        date: new Date().toISOString().split('T')[0],
        status: 'submitted'
      };

      setScrums([newScrum, ...scrums]);
      setOpenForm(false);
      setFormData({
        yesterday: '',
        today: '',
        blockers: 'None'
      });
      setSuccess(true);
    } catch (err) {
      setError('Failed to submit daily scrum. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Daily Scrum Updates
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
          disabled={openForm}
        >
          Add Today's Update
        </Button>
      </Box>

      {openForm && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Daily Scrum Update
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
                  multiline
                  rows={3}
                  label="What did you work on yesterday?"
                  name="yesterday"
                  value={formData.yesterday}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={3}
                  label="What will you work on today?"
                  name="today"
                  value={formData.today}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={2}
                  label="Any blockers?"
                  name="blockers"
                  value={formData.blockers}
                  onChange={handleInputChange}
                  helperText="Write 'None' if there are no blockers"
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => setOpenForm(false)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Submit Update'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}

      <Stack spacing={2}>
        {scrums.map((scrum) => (
          <Card key={scrum.id}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {scrum.date}
                </Typography>
                <Chip
                  label={scrum.status}
                  color="success"
                  size="small"
                />
              </Box>

              <Typography variant="h6" gutterBottom>
                Yesterday
              </Typography>
              <Typography paragraph>
                {scrum.yesterday}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Today
              </Typography>
              <Typography paragraph>
                {scrum.today}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Blockers
              </Typography>
              <Typography
                paragraph
                color={scrum.blockers === 'None' ? 'success.main' : 'error.main'}
              >
                {scrum.blockers}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Daily scrum update submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DailyScrum;