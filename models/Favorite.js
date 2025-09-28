import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courses: { type: [String], default: [] },
  colleges: { type: [String], default: [] },
  careers: { type: [String], default: [] },
  scholarships: { type: [String], default: [] },
});

export default mongoose.model("Favorite", favoriteSchema);
