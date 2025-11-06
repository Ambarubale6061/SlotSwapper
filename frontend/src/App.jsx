import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import CalendarView from "./components/CalendarView";

export default function App() {
  const [view, setView] = useState("timeGridWeek");
  const [events, setEvents] = useState([
    // Sample event
    {
      id: "1",
      title: "Sample Event",
      start: "2025-11-02T13:19:00",
      end: "2025-11-02T14:19:00",
      status: "BUSY",
    },
  ]);

  return (
    <div className="flex h-screen bg-mainBg">
      <Sidebar onAddEvent={(e) => setEvents([...events, e])} />
      <div className="flex-1 p-5">
        <CalendarView view={view} events={events} setEvents={setEvents} />
      </div>
    </div>
  );
}
