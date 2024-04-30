import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button, Modal, TextField, Alert } from '@mui/material';
import axios from 'axios';

const JournalCollectionPage = ({ journalEntries }) => {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [alert, setAlert] = useState(null);
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    // Fetch journal entries when component mounts
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/journals', {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      setJournals(response.data);
    } catch (error) {
      console.error('Error fetching journals:', error);
      // Handle error (e.g., show error message)
    }
  };

  // Function to handle opening the modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Function to handle adding a new journal
  const handleAddJournal = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

      // Make an API call to send the new journal data to the backend
      await axios.post('http://localhost:8080/journals', {
        title,
        description: description || null,
      }, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '', // Include the token in the request headers
        }
      });

      // Reset the form fields and close the modal
      setTitle('');
      setDescription('');
      handleCloseModal();

      // Show success alert
      setAlert({ type: 'success', message: 'Journal added successfully' });
    } catch (error) {
      console.error('Error adding journal:', error);
      // Show error alert
      setAlert({ type: 'error', message: 'Failed to add journal' });
    }
  };

  return (
    <div className="journal-collection-page">
      {/* Button to open the modal */}
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Add New Journal
      </Button>

      {/* Modal for adding a new journal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="modal-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
          {/* Form for adding a new journal */}
          <Typography variant="h6" gutterBottom>Add New Journal</Typography>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Description (optional)"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddJournal}>
            Add
          </Button>
        </div>
      </Modal>

      {/* Display journal cards */}
      <Grid container spacing={3}>
        {journals.map(journal => (
          <Grid item key={journal.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">{journal.title}</Typography>
                <Typography variant="body2">{journal.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* MUI Alert */}
      {alert && (
        <Alert severity={alert.type} onClose={() => setAlert(null)} sx={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
          {alert.message}
        </Alert>
      )}
    </div>
  );
};

export default JournalCollectionPage;
