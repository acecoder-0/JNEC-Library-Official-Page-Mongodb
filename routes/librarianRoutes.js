import express from "express";
import LibrarianQuery from "../models/LibrarianQuery.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const queries = await LibrarianQuery.find().sort({ createdAt: -1 });
    res.json(queries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const query = new LibrarianQuery(req.body);
    await query.save();
    res.json({ success: true, message: "Query submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const query = await LibrarianQuery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(query);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await LibrarianQuery.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
