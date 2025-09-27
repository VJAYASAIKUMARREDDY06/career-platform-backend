import express from "express";
import College from "../models/College.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new college → admin only
router.post("/", protect, authorize("admin"), async (req, res) => {
  try {
    const college = await College.create(req.body);
    res.status(201).json(college);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all colleges → public
router.get("/", async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single college by ID → public
router.get("/:id", async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ error: "College not found" });
    res.json(college);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update college by ID → admin only
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!college) return res.status(404).json({ error: "College not found" });
    res.json(college);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete college by ID → admin only
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const college = await College.findByIdAndDelete(req.params.id);
    if (!college) return res.status(404).json({ error: "College not found" });
    res.json({ message: "College deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
