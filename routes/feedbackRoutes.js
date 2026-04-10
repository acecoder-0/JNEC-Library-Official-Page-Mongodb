import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// Save feedback
router.post("/", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.json({ success: true, message: "Feedback saved ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all feedback
router.get("/", async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete feedback
router.delete("/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Feedback deleted ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
