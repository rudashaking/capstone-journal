import React, { useState } from 'react';
import "../Calendar/Calendar.scss"
const Calendar = () => {
  
  const [selectedDate, setSelectedDate] = useState(new Date());

  
  const handleDateClick = (date) => {
    setSelectedDate(date);
   
  };

 
  const generateCalendar = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const calendarArray = [];

   
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarArray.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    
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
