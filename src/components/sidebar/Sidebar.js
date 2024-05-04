import React, { useState } from 'react';
import './sidebar.scss';
import Calendar from '../Calendar/Calendar';
import Reminder from '../Reminders/Reminder';
import MoodAnalyzer from '../../components/Moodanalyzer/MoodAnalyzer';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const Sidebar = ({ newFinalTranscript}) => {
  const [aiResponse, setAiResponse] = useState('');

  const handleAiResponseChange = (event) => {
    setAiResponse(event.target.value);
  };

  return (
    <>
      <div className='sidebar'>
        <div className="calendar-reminder">
          <div className="calendar">
            <Calendar />
          </div>
          <div className="reminder">
            <Reminder />
          </div>
         
        </div>
      </div>
    </>
  );
};

export default Sidebar;
