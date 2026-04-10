import mongoose from "mongoose";

const committeeMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("CommitteeMember", committeeMemberSchema);
