const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "devsecret"
    );
    res.json({ token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "devsecret"
    );
    res.json({ token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
