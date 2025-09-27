import express from "express";
import Skill from "../models/Skill.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new skill → admin only
router.post("/", protect, authorize("admin"), async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all skills → public
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single skill by ID → public
router.get("/:id", async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update skill by ID → admin only
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete skill by ID → admin only
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
