import mongoose from "mongoose";

const librarianQuerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: "Pending", enum: ["Pending", "Replied", "Closed"] },
  reply: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("LibrarianQuery", librarianQuerySchema);
