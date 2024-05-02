import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button, Modal, TextField, Alert } from '@mui/material';
import axios from 'axios';
import "./JournalCollection.scss"

const JournalCollectionPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [alert, setAlert] = useState(null);
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    fetchJournals();
  }, []);
console.log(localStorage);
  const fetchJournals = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/journals/:id', {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      setJournals(response.data);
    } catch (error) {
      console.error('Error fetching journals:', error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddJournal = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/journals/:id', {
        title,
        description: description || null,
        content: [], 
      }, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        }
      });
      setTitle('');
      setDescription('');
      handleCloseModal();
      setJournals([...journals, response.data.journal]); 
      setAlert({ type: 'success', message: 'Journal added successfully' });
    } catch (error) {
      console.error('Error adding journal:', error);
      setAlert({ type: 'error', message: 'Failed to add journal' });
    }
  };

  return (
    <div className="journal-collection-page">
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Add New Journal
      </Button>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="modal-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
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

      {alert && (
        <Alert severity={alert.type} onClose={() => setAlert(null)} sx={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
          {alert.message}
        </Alert>
      )}
    </div>
  );
};

export default JournalCollectionPage;
