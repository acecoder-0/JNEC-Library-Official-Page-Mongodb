import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Journal from "../models/Journal.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/journals";
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const journals = await Journal.find().sort({ year: -1, createdAt: -1 });
    res.json(journals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", upload.single('pdf'), async (req, res) => {
  try {
    const journal = new Journal({
      title: req.body.title,
      year: req.body.year,
      pdfPath: req.file ? `/uploads/journals/${req.file.filename}` : null
    });
    await journal.save();
    res.json(journal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (journal && journal.pdfPath) {
      if (fs.existsSync('.' + journal.pdfPath)) {
        fs.unlinkSync('.' + journal.pdfPath);
      }
    }
    await Journal.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
