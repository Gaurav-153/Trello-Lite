const express = require("express");
const List = require("../models/List");
const router = express.Router();

// Create list
router.post("/", async (req, res) => {
  try {
    const { title, boardId } = req.body;
    const list = new List({ title, boardId });
    await list.save();
    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get lists for a board
router.get("/:boardId", async (req, res) => {
  try {
    const lists = await List.find({ boardId: req.params.boardId }).sort({ position: 1 });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
