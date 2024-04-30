import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../Components/sidebar/Sidebar'; 
import axios from 'axios';

const JournalPage = () => {
  const { id } = useParams(); // Get the journal ID from the URL params
  const [journal, setJournal] = useState(null);

  useEffect(() => {
    // Fetch the journal data when the component mounts
    fetchJournal();
  }, [id]); // Include id in the dependency array to refetch when id changes

  const fetchJournal = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/journals/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      setJournal(response.data);
    } catch (error) {
      console.error('Error fetching journal:', error);
    }
  };

  return (
    <div className="journal-page">
      {/* Sidebar component */}
      <Sidebar />

      <div className="journal-content">
        {/* Render journal content here */}
        {journal && (
          <div>
            <h2>{journal.title}</h2>
            <p>{journal.description}</p>
            {/* Additional journal content */}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
