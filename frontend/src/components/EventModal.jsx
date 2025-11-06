import React from "react";
import { motion } from "framer-motion";

export default function EventModal({ event, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <h3>{event.title}</h3>
      <p>Status: {event.status}</p>
      <button className="btn mt-2" onClick={onClose}>
        Close
      </button>
    </motion.div>
  );
}
