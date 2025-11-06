import React from "react";
import { motion } from "framer-motion";

export default function DayViewModal({ date, events, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96"
    >
      <h3 className="text-xl font-bold mb-2">
        Events on {date.toDateString()}
      </h3>
      {events.length === 0 && <p>No events.</p>}
      <ul className="dayview-list">
        {events.map((ev) => (
          <li key={ev.id}>
            {ev.title} - {ev.status} {ev.notes && `| Notes: ${ev.notes}`}
          </li>
        ))}
      </ul>
      <button className="btn mt-2 w-full bg-gray-500" onClick={onClose}>
        Close
      </button>
    </motion.div>
  );
}
