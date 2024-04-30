import React, { useState } from 'react';
import './sidebar.scss';

import Calendar from '../Calendar/Calendar';
import Reminder from '../Reminders/Reminder';

const Sidebar = ({ username }) => {
  const [aiResponse, setAiResponse] = useState('');

  const handleAiResponseChange = (event) => {
    setAiResponse(event.target.value);
   
  };

  const startWebSpeechAI = () => {
    console.log("Starting Web Speech AI...");
   
  };

  return (
   <>
        <div className="user-text">
          <p>Welcome! {username}</p>
        </div>

      <div className="calendar-reminder">
        <div className="calendar">
          <Calendar />
        </div>
        <div className="reminder">
          <Reminder />
        </div>
        <div className="ai-response">
          <textarea 
            value={aiResponse}
            onChange={handleAiResponseChange}
            placeholder="Type your AI response here..."
          />
        </div>
      </div>
   </>

  );
};

export default Sidebar;



