import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String }, // e.g., Programming, Design, Soft Skill
  level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
  createdAt: { type: Date, default: Date.now }
});

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
