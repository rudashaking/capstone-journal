import React, { useState } from 'react';
import './sidebar.scss';

import Calendar from '../Calendar/Calendar';
import Reminder from '../Reminders/Reminder';
import MoodAnalyzer from '../../components/VoiceText/MoodAnalyzer'; 

const Sidebar = ({ username }) => {
  const [aiResponse, setAiResponse] = useState('');

  const handleAiResponseChange = (event) => {
    setAiResponse(event.target.value);
<<<<<<< Updated upstream
  };

  const startWebSpeechAI = () => {
    console.log("Starting Web Speech AI...");
  };

  return (
    <div className="sidebar">
=======
  };

  return (
    <>
>>>>>>> Stashed changes
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
          {/* Render the MoodAnalyzer component */}
          <MoodAnalyzer transcript={aiResponse} />
        </div>
      </div>
<<<<<<< Updated upstream
    </div>
=======
    </>
>>>>>>> Stashed changes
  );
};

export default Sidebar;
<<<<<<< Updated upstream




=======
>>>>>>> Stashed changes
