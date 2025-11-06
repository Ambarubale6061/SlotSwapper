import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Sidebar({ onAddEvent }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [status, setStatus] = useState("BUSY");

  const handleAdd = () => {
    if (!title || !start || !end) return alert("Fill all fields");
    onAddEvent({ id: Date.now().toString(), title, start, end, status });
    setTitle("");
    setStart("");
    setEnd("");
    setStatus("BUSY");
  };

  return (
    <motion.div
      className="w-80 bg-sidebarBg text-white p-5 flex flex-col justify-between h-screen shadow-xl backdrop-blur-md rounded-xl"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="text-2xl font-bold mb-5">SlotSwapper</h2>
        <h3 className="text-lg font-semibold mb-2">Calendars</h3>
        <ul className="mb-5">
          <li className="py-1 px-2 rounded hover:bg-primary cursor-pointer">
            My Calendar
          </li>
          <li className="py-1 px-2 rounded hover:bg-primary cursor-pointer">
            Team Calendar
          </li>
        </ul>

        <h3 className="text-lg font-semibold mb-2">Add Event</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 rounded mb-2 border-none outline-none text-black shadow-inner"
        />
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="w-full p-2 rounded mb-2 border-none outline-none text-black shadow-inner"
        />
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="w-full p-2 rounded mb-2 border-none outline-none text-black shadow-inner"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 rounded mb-4 border-none outline-none text-black shadow-inner"
        >
          <option value="BUSY">BUSY</option>
          <option value="SWAPPABLE">SWAPPABLE</option>
          <option value="SWAP_PENDING">SWAP_PENDING</option>
        </select>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-primary text-white p-2 rounded shadow-lg"
          onClick={handleAdd}
        >
          Add Event
        </motion.button>
      </div>
      <div className="text-xs mt-5 opacity-50">
        High-end SlotSwapper UI by Ambar
      </div>
    </motion.div>
  );
}
