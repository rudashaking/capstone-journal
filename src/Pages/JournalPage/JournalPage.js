import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../Components/sidebar/Sidebar'; 
import axios from 'axios';

const JournalPage = () => {
  const { id } = useParams(); 
  const [journal, setJournal] = useState(null);

  useEffect(() => {
   
    fetchJournal();
  }, [id]); 

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
   
      <Sidebar />

      <div className="journal-content">
       
        {journal && (
          <div>
            <h2>{journal.title}</h2>
            <p>{journal.description}</p>
          
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
