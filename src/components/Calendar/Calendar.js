import React, { useState } from "react";
import "../Calendar/Calendar.scss";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const submittedDates = [
    new Date(2024, 4, 2),
    new Date(2024, 4, 10),
    new Date(2024, 4, 15),
  ];

  const reminders = [
    { date: "2024-05-25", title: "Reflect on yesterday", color: "#FF6347" },
    {
      date: "2024-05-26",
      title: "Write about today's achievements",
      color: "#7FFF00",
    },
    { date: "2024-05-27", title: "Think about future goals", color: "#4169E1" },
  ];

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const generateCalendar = () => {
    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0,
    ).getDate();
    const firstDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1,
    ).getDay();
    const calendarArray = [];

    const reminderDates = reminders.map((reminder) => new Date(reminder.date));

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarArray.push(
        <div key={`empty-${i}`} className="calendar__day empty"></div>,
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        i,
      );
      const isSubmitted = submittedDates.some(
        (submittedDate) => submittedDate.toDateString() === date.toDateString(),
      );
      const hasReminder = reminderDates.some(
        (reminderDate) => reminderDate.toDateString() === date.toDateString(),
      );

      let classNames = `calendar__day ${date.toDateString() === selectedDate.toDateString() ? "selected" : ""}`;
      if (isSubmitted) {
        classNames += " submitted";
      }
      if (hasReminder) {
        classNames += " has-reminder";
      }

      calendarArray.push(
        <div
          key={i}
          className={classNames}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>,
      );
    }

    return calendarArray;
  };

  return (
    <div className="calendar">
      <div className="calendar__header">
        <button
          onClick={() =>
            setSelectedDate(
              new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() - 1,
                1,
              ),
            )
          }
        >
          &lt;
        </button>
        <h2>
          {selectedDate.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={() =>
            setSelectedDate(
              new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                1,
              ),
            )
          }
        >
          &gt;
        </button>
      </div>
      <div className="calendar__grid">{generateCalendar()}</div>
    </div>
  );
};

export default Calendar;
