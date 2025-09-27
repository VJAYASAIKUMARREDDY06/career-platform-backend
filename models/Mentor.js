import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  expertise: [{ type: String }], // e.g., skills or domains
  bio: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Mentor = mongoose.model("Mentor", mentorSchema);

export default Mentor;