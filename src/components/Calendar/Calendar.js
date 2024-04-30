import React, { useState } from 'react';
import "../Calendar/Calendar.scss"
const Calendar = () => {
  // State to keep track of the selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to handle when a date is clicked
  const handleDateClick = (date) => {
    setSelectedDate(date);
    // You can add additional logic here, such as fetching events for the selected date
  };

  // Function to generate calendar grid
  const generateCalendar = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const calendarArray = [];

    // Push empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarArray.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Push cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
      calendarArray.push(
        <div key={i} className={`calendar-day ${date.toDateString() === selectedDate.toDateString() ? 'selected' : ''}`} onClick={() => handleDateClick(date)}>
          {i}
        </div>
      );
    }

    return calendarArray;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>&lt;</button>
        <h2>{selectedDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>&gt;</button>
      </div>
      <div className="calendar-grid">{generateCalendar()}</div>
    </div>
  );
};

export default Calendar;
