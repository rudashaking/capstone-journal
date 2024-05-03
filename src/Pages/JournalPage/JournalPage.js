import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Button, TextField } from '@mui/material';
import './JournalPage.scss';

const JournalPage = () => {
  const { userId, id } = useParams();
  const [journalEntries, setJournalEntries] = useState([]);
  const [addingEntry, setAddingEntry] = useState(false);
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryContent, setNewEntryContent] = useState('');

  useEffect(() => {
    fetchJournalEntries();
  }, [userId, id]); 

  const fetchJournalEntries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/journals/${userId}/${id}/entries`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      setJournalEntries(response.data);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    }
  };

  const handleAddEntry = () => {
    setAddingEntry(true);
  };

  const handleCancelAddEntry = () => {
    setAddingEntry(false);
    setNewEntryTitle('');
    setNewEntryContent('');
  };

  const handleSubmitNewEntry = async () => {
    try {
      const token = localStorage.getItem('token');
      const currentDate = new Date().toISOString();
      const response = await axios.put(
        `http://localhost:8080/journals/${userId}/${id}/entries`,
        {
          title: newEntryTitle,
          content: newEntryContent,
          createdAt: currentDate,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        }
      );
      const newEntry = {
        ...response.data,
        createdAt: new Date(response.data.createdAt).toLocaleString(),
      };
      setJournalEntries(prevEntries => [...prevEntries, newEntry]);
      setNewEntryTitle('');
      setNewEntryContent('');
      setAddingEntry(false);
      await fetchJournalEntries();
    } catch (error) {
      console.error('Error adding new entry:', error);
    }
  };

  return (
    <div className="journal-page">
      <div className="journal-content">
        {/* Render existing journal entries */}
        <ul>
          {journalEntries.map((entry, index) => (
            <li key={index}>
              <h3>{entry.title}</h3>
              <p>{entry.content}</p>
              <p>Created at: {entry.createdAt}</p>
            </li>
          ))}
        </ul>
        {/* Button to add a new entry */}
        {!addingEntry && (
          <Button variant="contained" color="primary" onClick={handleAddEntry}>
            Add Entry
          </Button>
        )}
        {/* Form for adding a new entry */}
        {addingEntry && (
          <div className="add-entry-form">
            <TextField
              label="New Entry Title"
              value={newEntryTitle}
              onChange={e => setNewEntryTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="New Entry Content"
              value={newEntryContent}
              onChange={e => setNewEntryContent(e.target.value)}
              fullWidth
            />
            <Button onClick={handleSubmitNewEntry} variant="contained" color="primary">
              Submit
            </Button>
            <Button onClick={handleCancelAddEntry} variant="contained" color="secondary">
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
