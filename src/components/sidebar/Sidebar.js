import React, { useState } from 'react';
import './sidebar.scss';
import Calendar from '../Calendar/Calendar';
import Reminder from '../Reminders/Reminder';
import MoodAnalyzer from '../../components/VoiceText/MoodAnalyzer';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const Sidebar = ({ username }) => {
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
          <div className="ai-response">
            <TextareaAutosize
              value={aiResponse}
              onChange={handleAiResponseChange}
              placeholder="Type your AI response here..."
              minRows={1} 
              maxRows={3} 
              style={{ width: '100%' }}
            />
            <MoodAnalyzer transcript={aiResponse} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
