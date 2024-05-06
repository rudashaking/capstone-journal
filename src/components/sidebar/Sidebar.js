import React, { useState } from "react";
import "./sidebar.scss";
import Calendar from "../Calendar/Calendar";
import Reminder from "../Reminders/Reminder";
import MoodAnalyzer from "../Moodanalyzer/MoodAnalyzer";
import TextField from "@mui/material/TextField";

const Sidebar = ({ newFinalTranscript }) => {
  const [aiResponse, setAiResponse] = useState("");

  const handleAiResponseChange = (event) => {
    setAiResponse(event.target.value);
  };

  return (
    <>
      <div className="sidebar">
        <div className="calendar-reminder">
          <div className="calendar">
            <Calendar />
          </div>
          <div className="reminder">
            <Reminder />
          </div>

          <div className="mood-analyzer">
            <TextField
              className="mood-analyzer-instructions"
              multiline
              InputProps={{
                readOnly: true,
              }}
              value="When using the mood analyzer:
              ** ONLY WORKS WITH SPEECH TO TEXT**
              1. Speak Clearly
                   2. Click Analyze Mood
                    3. View Analyzed Mood
                   4. Explore Suggestions
                   5. Adjust if Necessary
                   6. Enjoy the Experience"
              onChange={handleAiResponseChange}
              variant="outlined"
              fullWidth
              rows={5}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
