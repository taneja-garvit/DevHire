import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
         
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, default: "Remote" },
    experienceLevel: { type: String, enum: ["Fresher", "Junior", "Mid", "Senior"], default: "Junior" },
    skills: [{ type: String }],
    salaryRange: { type: String },
    description: { type: String, required: true },
    postedBy: { type: String },
  },
  { timestamps: true }

);
export default mongoose.model("Job",jobSchema);