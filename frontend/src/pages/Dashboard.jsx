import React, { useState } from "react";
import Sidebar from "./Sidebar";
import CalendarView from "./CalendarView";
import TaskPanel from "./TaskPanel";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [view, setView] = useState("timeGridWeek");
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Team Meeting",
      start: "2025-11-02T10:00:00",
      end: "2025-11-02T11:00:00",
      status: "BUSY",
    },
    {
      id: "2",
      title: "Focus Block",
      start: "2025-11-04T14:00:00",
      end: "2025-11-04T15:00:00",
      status: "SWAPPABLE",
    },
  ]);

  return (
    <div className="flex h-screen bg-mainBg gap-4 p-4">
      {/* Left Sidebar */}
      <Sidebar onAddEvent={(newEvent) => setEvents([...events, newEvent])} />

      {/* Center Calendar */}
      <motion.div
        className="flex-1 rounded-xl shadow-2xl bg-white p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <CalendarView view={view} events={events} setEvents={setEvents} />
      </motion.div>

      {/* Right Task/Details Panel */}
      <motion.div
        className="w-80 bg-white/10 backdrop-blur-md p-4 shadow-xl rounded-xl flex flex-col"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <TaskPanel events={events} />
      </motion.div>
    </div>
  );
}
