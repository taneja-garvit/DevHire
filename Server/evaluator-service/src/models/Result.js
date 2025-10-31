import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  recruiterId: { type: String, required: true },
  testId: { type: String, required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Result", resultSchema);
