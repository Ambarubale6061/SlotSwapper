const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: {
    type: String,
    enum: ["BUSY", "SWAPPABLE", "SWAP_PENDING"],
    default: "BUSY",
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Event", EventSchema);
