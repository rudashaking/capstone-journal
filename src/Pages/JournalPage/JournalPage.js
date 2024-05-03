import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JournalPage = () => {
  const { id } = useParams();
  const [journal, setJournal] = useState(null);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    console.log('Fetching journal...');
    fetchJournal();
  }, [id]);

  const fetchJournal = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/journals/${id}/entries`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      console.log('Journal fetched:', response.data);
      setJournal(response.data);
    } catch (error) {
      console.error('Error fetching journal:', error);
    }
  };

  useEffect(() => {
    if (journal) {
      console.log('Fetching journal entries...');
      fetchJournalEntries(); 
    }
  }, [journal]);

  const fetchJournalEntries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/journals/${id}/entries`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      console.log('Journal entries fetched:', response.data);
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    }
  };

  return (
    <div className="journal-page">
      <div className="journal-content">
        {journal && (
          <div>
            <h2>{journal.title}</h2>
            <p>{journal.description}</p>
            {/* Render journal entries */}
            <ul>
              {entries.map(entry => (
                <li key={entry.entryId}>
                  {entry.content}
                  <p>Created at: {entry.createdAt}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
