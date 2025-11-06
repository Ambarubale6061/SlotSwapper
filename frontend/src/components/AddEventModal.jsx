import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AddEventModal({ date, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("BUSY");

  const handleAdd = () => {
    onAdd({
      id: Date.now().toString(),
      title,
      start: date.toISOString(),
      end: date.toISOString(),
      status,
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <h3>Add Event</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border p-2 my-2"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border p-2"
      >
        <option value="BUSY">BUSY</option>
        <option value="SWAPPABLE">SWAPPABLE</option>
        <option value="SWAP_PENDING">SWAP_PENDING</option>
      </select>
      <button className="btn mt-2" onClick={handleAdd}>
        Add
      </button>
      <button className="btn mt-2 bg-gray-500" onClick={onClose}>
        Cancel
      </button>
    </motion.div>
  );
}
