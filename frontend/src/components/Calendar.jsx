import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "./EventModal";
import DayViewModal from "./DayViewModal";
import toast from "react-hot-toast";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setEvents([
      {
        id: "1",
        title: "Team Meeting",
        start: "2025-11-02T10:00:00",
        end: "2025-11-02T11:00:00",
        status: "BUSY",
        notes: "",
      },
      {
        id: "2",
        title: "Focus Block",
        start: "2025-11-03T14:00:00",
        end: "2025-11-03T15:00:00",
        status: "SWAPPABLE",
        notes: "",
      },
    ]);
  }, []);

  const handleDateClick = (info) => setSelectedDate(info.date);
  const handleEventClick = (info) =>
    setSelectedEvent(events.find((e) => e.id === info.event.id));
  const closeModal = () => {
    setSelectedEvent(null);
    setSelectedDate(null);
  };
  const updateEventNotes = (id, notes) => {
    setEvents(events.map((ev) => (ev.id === id ? { ...ev, notes } : ev)));
    toast.success("Notes updated!");
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
        events={events.map((e) => ({
          id: e.id,
          title: e.title,
          start: e.start,
          end: e.end,
          color:
            e.status === "BUSY"
              ? "#2563eb"
              : e.status === "SWAPPABLE"
              ? "#facc15"
              : "#9d4edd",
        }))}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={closeModal}
          onSaveNotes={updateEventNotes}
        />
      )}
      {selectedDate && (
        <DayViewModal
          date={selectedDate}
          events={events.filter(
            (ev) =>
              new Date(ev.start).toDateString() === selectedDate.toDateString()
          )}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
