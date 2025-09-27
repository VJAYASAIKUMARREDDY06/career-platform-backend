import express from "express";
import Mentor from "../models/Mentor.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new mentor → admin only
router.post("/", protect, authorize("admin"), async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.status(201).json(mentor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all mentors → public
router.get("/", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single mentor by ID → public
router.get("/:id", async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ error: "Mentor not found" });
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update mentor by ID → admin only
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mentor) return res.status(404).json({ error: "Mentor not found" });
    res.json(mentor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete mentor by ID → admin only
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndDelete(req.params.id);
    if (!mentor) return res.status(404).json({ error: "Mentor not found" });
    res.json({ message: "Mentor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
