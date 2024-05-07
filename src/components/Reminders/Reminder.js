import React from "react";
import "./Reminders.scss";

const Reminder = () => {
  const reminders = [
    { date: "2024-04-25", title: "Reflect on yesterday", color: "#FF6347" },
    {
      date: "2024-04-26",
      title: "Write about today's achievements",
      color: "#7FFF00",
    },
    { date: "2024-04-27", title: "Think about future goals", color: "#4169E1" },
    { date: "2024-04-29", title: "Think about future goals", color: "#4169E1" },
  ];

  return (
    <div className="reminder-container">
      <h3>Journal Entry Reminders</h3>
      <div className="reminder-list">
        {reminders.map((reminder, index) => (
          <div
            key={index}
            className="reminder-item"
            style={{ backgroundColor: reminder.color }}
          >
            <div className="reminder-date">{reminder.date}</div>
            <div className="reminder-title">{reminder.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reminder;
