import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { motion } from "framer-motion";

export default function CalendarView({ view, events, setEvents }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (info) =>
    setSelectedEvent(events.find((e) => e.id === info.event.id));
  const closeModal = () => setSelectedEvent(null);

  return (
    <motion.div
      className="rounded-xl shadow-2xl bg-white p-3 h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={view}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events.map((e) => ({
          ...e,
          color:
            e.status === "BUSY"
              ? "#2563eb"
              : e.status === "SWAPPABLE"
              ? "#facc15"
              : "#9d4edd",
        }))}
        eventClick={handleEventClick}
        selectable
        select={(info) => {
          const title = prompt("Enter event title:");
          if (title) {
            setEvents([
              ...events,
              {
                id: Date.now().toString(),
                title,
                start: info.startStr,
                end: info.endStr,
                status: "BUSY",
              },
            ]);
          }
        }}
      />
      {/* Optional modal for event details */}
      {selectedEvent && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="modal-content bg-white p-5 rounded-xl shadow-2xl">
            <h2 className="text-xl font-bold mb-3">{selectedEvent.title}</h2>
            <p>Start: {selectedEvent.start}</p>
            <p>End: {selectedEvent.end}</p>
            <p>Status: {selectedEvent.status}</p>
            <button className="btn mt-3" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
