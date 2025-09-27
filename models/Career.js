import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ["job", "internship", "career-path"], default: "job" },
  skillsRequired: [{ type: String }],
  postedBy: { type: String }, // could be admin or company name
  createdAt: { type: Date, default: Date.now }
});

const Career = mongoose.model("Career", careerSchema);

export default Career;
