import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  pdfPath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Journal", journalSchema);
