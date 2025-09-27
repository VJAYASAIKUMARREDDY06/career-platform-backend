import express from "express";
import Scholarship from "../models/Scholarship.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new scholarship → admin only
router.post("/", protect, authorize("admin"), async (req, res) => {
  try {
    const scholarship = await Scholarship.create(req.body);
    res.status(201).json(scholarship);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all scholarships → public
router.get("/", async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single scholarship by ID → public
router.get("/:id", async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) return res.status(404).json({ error: "Scholarship not found" });
    res.json(scholarship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update scholarship by ID → admin only
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!scholarship) return res.status(404).json({ error: "Scholarship not found" });
    res.json(scholarship);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete scholarship by ID → admin only
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndDelete(req.params.id);
    if (!scholarship) return res.status(404).json({ error: "Scholarship not found" });
    res.json({ message: "Scholarship deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
