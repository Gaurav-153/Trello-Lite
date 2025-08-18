const express = require("express");
const Activity = require("../models/Activity");
const authMiddleware = require("../middleware/authMiddleware"); // your auth middleware
const router = express.Router();

// Get all activity logs for a board
router.get("/:boardId", authMiddleware, async (req, res) => {
  try {
    const logs = await Activity.find({ boardId: req.params.boardId }).sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add new activity log
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { boardId, message } = req.body;
    const activity = new Activity({ boardId, message });
    await activity.save();
    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
