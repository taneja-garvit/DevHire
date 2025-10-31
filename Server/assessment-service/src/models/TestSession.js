import mongoose from "mongoose";

const testSessionSchema = new mongoose.Schema(
  {
    candidateId: { type: String, required: true },
    jobId: { type: String, required: true },
    questions: [
      {
        questionId: String,
        questionText: String,
        options: [String],
      },
    ],
    score: { type: Number, default: 0 },
    status: { type: String, enum: ["ongoing", "completed"], default: "ongoing" },
  },
  { timestamps: true }
);

export default mongoose.model("TestSession", testSessionSchema);