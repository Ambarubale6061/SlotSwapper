import React from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function SwapModal({
  swapEvent,
  mySwappableEvents,
  token,
  onClose,
}) {
  const requestSwap = (myEventId) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/swap-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ myEventId, theirEventId: swapEvent._id }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Swap requested");
        onClose();
      });
  };

  return (
    <motion.div className="modal bg-white p-6 rounded shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <h3>Request swap for: {swapEvent.title}</h3>
      <ul>
        {mySwappableEvents.map((e) => (
          <li key={e._id}>
            {e.title}{" "}
            <button className="btn ml-2" onClick={() => requestSwap(e._id)}>
              Offer Swap
            </button>
          </li>
        ))}
      </ul>
      <button className="btn mt-2 bg-gray-500" onClick={onClose}>
        Close
      </button>
    </motion.div>
  );
}
