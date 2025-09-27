import express from "express";
import Career from "../models/Career.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new career → only admin
router.post("/", protect, authorize("admin"), async (req, res) => {
  try {
    const career = await Career.create(req.body);
    res.status(201).json(career);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all careers → public
router.get("/", async (req, res) => {
  try {
    const careers = await Career.find();
    res.json(careers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single career → public
router.get("/:id", async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) return res.status(404).json({ error: "Career not found" });
    res.json(career);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update career → admin only
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!career) return res.status(404).json({ error: "Career not found" });
    res.json(career);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete career → admin only
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) return res.status(404).json({ error: "Career not found" });
    res.json({ message: "Career deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
