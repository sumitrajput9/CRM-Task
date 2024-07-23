import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Welcome to Our CRM Platform
      </Typography>
      <Typography variant="h6" component="p" gutterBottom align="center">
        Manage your leads and streamline your sales process with ease.
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Add Lead
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Easily add new leads to your CRM system.
              </Typography>
              <Typography variant="body2">
                Keep your leads organized and up-to-date with our intuitive lead addition form.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="primary" onClick={() => navigate('/add')}>
                Go to Add Lead
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Leads
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                View and manage all your leads in one place.
              </Typography>
              <Typography variant="body2">
                Track lead progress, update statuses, and maintain effective communication.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="primary" onClick={() => navigate('/lead')}>
                View Leads
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
