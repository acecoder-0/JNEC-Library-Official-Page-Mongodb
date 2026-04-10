import express from "express";
import CommitteeMember from "../models/CommitteeMember.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const members = await CommitteeMember.find().sort({ order: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const member = new CommitteeMember(req.body);
    await member.save();
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const member = await CommitteeMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await CommitteeMember.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
