import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, TextField } from '@mui/material';
import { getLeadsApi, updateLeadApi } from '../Services/ApiService';
import toast, { Toaster } from 'react-hot-toast';
import { Container } from 'react-bootstrap';

export function Lead() {
  const [leads, setLeads] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedLead, setEditedLead] = useState({});

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const data = await getLeadsApi();
      console.log(data.data);
      setLeads(data.data);
    } catch (error) {
      toast.error('Failed to fetch leads');
      console.error(error);
    }
  };

  const handleEditClick = (lead) => {
    setEditMode(lead._id);
    setEditedLead(lead.data.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {}));
  };

  const handleInputChange = (key, value) => {
    setEditedLead({ ...editedLead, [key]: value });
  };

  const handleSaveClick = async (id) => {
    try {
      const data = Object.entries(editedLead).map(([key, value]) => ({
        key,
        value,
      }));
      
      console.log(data);
      await updateLeadApi(id, data);
      toast.success('Lead updated successfully and email sent');
      fetchLeads(); // Refresh leads list
      setEditMode(null); // Exit edit mode
    } catch (error) {
      toast.error('Failed to update lead');
      console.error(error);
    }
  };
  

  const handleCancelClick = () => {
    setEditMode(null);
  };

  return (
     <Container>
          <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom className="text-center">
        Leads List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map((lead) => {
            const leadData = lead.data.reduce((acc, { key, value }) => {
              acc[key] = value;
              return acc;
            }, {});
            const isEditing = editMode === lead._id;
            return (
              <TableRow key={lead._id}>
                <TableCell>
                  {isEditing ? (
                    <TextField
                      value={editedLead.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    leadData.name
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <TextField
                      value={editedLead.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    leadData.email
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <TextField
                      value={editedLead.status || ''}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                    />
                  ) : (
                    leadData.status
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <TextField
                      value={editedLead.account || ''}
                      onChange={(e) => handleInputChange('account', e.target.value)}
                    />
                  ) : (
                    leadData.account
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <TextField
                      value={editedLead.designation || ''}
                      onChange={(e) => handleInputChange('designation', e.target.value)}
                    />
                  ) : (
                    leadData.designation
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <TextField
                      value={editedLead.phonenumber || ''}
                      onChange={(e) => handleInputChange('phonenumber', e.target.value)}
                    />
                  ) : (
                    leadData.phonenumber
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <TextField
                      value={editedLead.type || ''}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                    />
                  ) : (
                    leadData.type
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <>
                      <Button variant="contained" color="primary" className='ps-3' onClick={() => handleSaveClick(lead._id)}>
                        Save
                      </Button>
                      <Button variant="contained" color="secondary" className='mt-2' onClick={handleCancelClick} sx={{ ml: 1 }}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="contained" color="primary" onClick={() => handleEditClick(lead)}>
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Toaster />
    </TableContainer>
     </Container>
  );
}
