import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Paper from "../models/Paper.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/papers";
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
    const papers = await Paper.find().sort({ department: 1, year: -1 });
    res.json(papers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", upload.single('pdf'), async (req, res) => {
  try {
    const paper = new Paper({
      title: req.body.title,
      department: req.body.department,
      semester: req.body.semester,
      subject: req.body.subject,
      year: req.body.year,
      pdfPath: req.file ? `/uploads/papers/${req.file.filename}` : null
    });
    await paper.save();
    res.json(paper);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);
    if (paper && paper.pdfPath) {
      if (fs.existsSync('.' + paper.pdfPath)) {
        fs.unlinkSync('.' + paper.pdfPath);
      }
    }
    await Paper.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
