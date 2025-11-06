import React from "react";

export default function CalendarHeader({ currentView, setCurrentView }) {
  return (
    <div>
      <button className="btn" onClick={() => setCurrentView("dayGridMonth")}>
        Month
      </button>
      <button className="btn" onClick={() => setCurrentView("timeGridWeek")}>
        Week
      </button>
      <button className="btn" onClick={() => setCurrentView("timeGridDay")}>
        Day
      </button>
    </div>
  );
}
