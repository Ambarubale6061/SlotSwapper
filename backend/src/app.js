const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const swapRoutes = require("./routes/swaps");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api", swapRoutes);

app.get("/_health", (req, res) => res.json({ ok: true }));

module.exports = app;
