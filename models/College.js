import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  coursesOffered: [{ type: String }],
  ranking: { type: Number },
  website: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const College = mongoose.model("College", collegeSchema);

export default College;
