import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // profile details (optional, can be updated later)
    grade: { type: String },
    contact: { type: String },
    state: { type: String },
    caste: { type: String },
    gender: { type: String },

    // new field: favorites
    favorites: {
      courses: { type: [String], default: [] },
      colleges: { type: [String], default: [] },
      careers: { type: [String], default: [] },
      scholarships: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
