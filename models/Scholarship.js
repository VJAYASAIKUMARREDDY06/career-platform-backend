import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  eligibility: { type: String },
  amount: { type: String }, // e.g., "$1000"
  deadline: { type: Date },
  link: { type: String }, // URL to apply
  createdAt: { type: Date, default: Date.now }
});

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

export default Scholarship;
