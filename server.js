import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import scholarshipRoutes from "./routes/scholarshipRoutes.js";
import collegeRoutes from "./routes/collegeRoutes.js";
import authRoutes from "./routes/authRoutes.js";  // Auth routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ API routes
app.use("/api/auth", authRoutes);           // Signup/Login
app.use("/api/users", userRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/colleges", collegeRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
