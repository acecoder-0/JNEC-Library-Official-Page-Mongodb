import mongoose from "mongoose";

const marqueeSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Marquee", marqueeSchema);
