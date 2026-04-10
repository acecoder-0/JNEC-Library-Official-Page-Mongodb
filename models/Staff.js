import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qualification: { type: String, required: true },
  designation: { type: String, required: true },
  section: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Staff", staffSchema);
