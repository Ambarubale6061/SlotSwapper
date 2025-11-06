const express = require("express");
const Event = require("../models/Event");
const SwapRequest = require("../models/SwapRequest");
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

router.get("/swappable-slots", async (req, res) => {
  const events = await Event.find({
    ownerId: { $ne: req.user.userId },
    status: "SWAPPABLE",
  });
  res.json(events);
});

router.post("/swap-request", async (req, res) => {
  const { myEventId, theirEventId } = req.body;
  const myEv = await Event.findById(myEventId);
  const theirEv = await Event.findById(theirEventId);
  if (
    !myEv ||
    !theirEv ||
    myEv.status !== "SWAPPABLE" ||
    theirEv.status !== "SWAPPABLE"
  )
    return res.status(400).json({ error: "Invalid events" });

  const swap = await SwapRequest.create({
    myEventId,
    myEventId,
    theirEventId,
    requesterId: req.user.userId,
    responderId: theirEv.ownerId,
    status: "PENDING",
  });
  myEv.status = "SWAP_PENDING";
  theirEv.status = "SWAP_PENDING";
  await myEv.save();
  await theirEv.save();
  res.json({ swap });
});

router.post("/swap-response/:id", async (req, res) => {
  const { accept } = req.body;
  const swap = await SwapRequest.findById(req.params.id);
  if (!swap) return res.status(404).json({ error: "Not found" });
  const myEv = await Event.findById(swap.myEventId);
  const theirEv = await Event.findById(swap.theirEventId);
  if (accept) {
    const temp = myEv.ownerId;
    myEv.ownerId = theirEv.ownerId;
    theirEv.ownerId = temp;
    myEv.status = "BUSY";
    theirEv.status = "BUSY";
    swap.status = "ACCEPTED";
  } else {
    myEv.status = "SWAPPABLE";
    theirEv.status = "SWAPPABLE";
    swap.status = "REJECTED";
  }
  await myEv.save();
  await theirEv.save();
  await swap.save();
  res.json({ status: swap.status });
});

module.exports = router;
