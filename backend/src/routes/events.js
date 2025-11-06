const express = require("express");
const Event = require("../models/Event");
const jwt = require("jsonwebtoken");
const router = express.Router();

function auth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ error: "No token" });
  const token = header.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "devsecret");
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

router.use(auth);

router.get("/", async (req, res) => {
  const events = await Event.find({ ownerId: req.user.userId });
  res.json(events);
});

router.post("/", async (req, res) => {
  const { title, startTime, endTime } = req.body;
  const ev = await Event.create({
    title,
    startTime,
    endTime,
    ownerId: req.user.userId,
  });
  res.json(ev);
});

router.put("/:id", async (req, res) => {
  const ev = await Event.findOneAndUpdate(
    { _id: req.params.id, ownerId: req.user.userId },
    req.body,
    { new: true }
  );
  res.json(ev);
});

router.delete("/:id", async (req, res) => {
  await Event.findOneAndDelete({
    _id: req.params.id,
    ownerId: req.user.userId,
  });
  res.json({ ok: true });
});

module.exports = router;
