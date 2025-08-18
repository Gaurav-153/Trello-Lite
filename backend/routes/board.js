const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const authMiddleware = require("../middleware/authMiddleware");

// Get all boards for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const boards = await Board.find({ owner: req.user.id });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create new board
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;
    const board = new Board({ title, owner: req.user.id });
    await board.save();
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
