const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// Create Task
router.post("/", async (req, res) => {
  try {
    const { title, description, listId } = req.body;
    const task = new Task({ title, description, listId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get tasks for a list
router.get("/:listId", async (req, res) => {
  try {
    const tasks = await Task.find({ listId: req.params.listId }).sort({ position: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update task (drag & drop)
router.put("/:taskId", async (req, res) => {
  try {
    const { listId } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.taskId, { listId }, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
