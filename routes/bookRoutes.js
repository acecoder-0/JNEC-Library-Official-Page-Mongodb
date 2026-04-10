import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Book from "../models/Book.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/books";
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
    const books = await Book.find().sort({ year: -1, createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", upload.single('pdf'), async (req, res) => {
  try {
    const book = new Book({
      title: req.body.title,
      year: req.body.year,
      category: req.body.category,
      pdfPath: req.file ? `/uploads/books/${req.file.filename}` : null
    });
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book && book.pdfPath) {
      if (fs.existsSync('.' + book.pdfPath)) {
        fs.unlinkSync('.' + book.pdfPath);
      }
    }
    await Book.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
