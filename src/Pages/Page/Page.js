import React, { useState } from 'react';
import './Page.scss';
import Sidebar from '../../Components/sidebar/Sidebar'; 

const JournalPage = () => {
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const [currentDate] = useState(new Date().toLocaleDateString());

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleEntryChange = (event) => {
    setEntry(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log("Title:", title);
    console.log("Entry:", entry);
    console.log("Date:", currentDate);
    
    setTitle('');
    setEntry('');
  };

  return (
    <div className='journal-page'>
      <div className='form-container'>
        <div className='title-date-container'>
          <input
            type='text'
            value={title}
            onChange={handleTitleChange}
            placeholder='Title'
            className='title-input'
            required
          />
          <div className='date'>{currentDate}</div>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={entry}
            onChange={handleEntryChange}
            placeholder='Write your entry here...'
            className='entry-textarea'
            required
          ></textarea>
          <button type='submit' className='submit-button'>Save Entry</button>
        </form>
      </div>
    </div>
  );
};

export default JournalPage;
