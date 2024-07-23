import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Grid, Box } from '@mui/material';
import { addLeadApi } from '../Services/ApiService';
import toast, { Toaster } from 'react-hot-toast';

export function AddLead() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    status: '',
    account: '',
    designation: '',
    phonenumber: '',
    type: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await addLeadApi(formValues);
      if (data) {
        toast.success('Lead added successfully');
      }
      console.log('Form Submitted', formValues);
    } catch (error) {
      toast.error('Failed to submit form');
      console.error(error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 600 }}>
        <Typography variant="h4" component="h1" gutterBottom className="text-center">
          Add New Lead
        </Typography>
        <Typography variant="subtitle1" gutterBottom className="text-center">
          Welcome to Our CRM App
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {Object.keys(formValues).map((key) => (
              <Grid item xs={12} key={key}>
                <TextField
                  name={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  variant="outlined"
                  fullWidth
                  value={formValues[key]}
                  onChange={handleChange}
                  required={key === 'name' || key === 'email' || key === 'status'}
                />
              </Grid>
            ))}
            <Grid item xs={12} className="text-center">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <Toaster />
      </Paper>
    </Box>
  );
}
