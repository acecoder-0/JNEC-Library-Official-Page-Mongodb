import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  category: { type: String },
  pdfPath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Book", bookSchema);
