import express from "express";
import Favorite from "../models/Favorite.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// middleware to verify JWT
const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// GET /api/favorites - get user favorites
router.get("/", auth, async (req, res) => {
  try {
    let fav = await Favorite.findOne({ user: req.userId });
    if (!fav) {
      fav = new Favorite({ user: req.userId });
      await fav.save();
    }
    res.json({ success: true, favorites: fav });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/favorites - add/remove favorite item
router.put("/", auth, async (req, res) => {
  const { item, type } = req.body; // type: courses/colleges/careers/scholarships
  if (!item || !type) return res.status(400).json({ success: false, message: "Missing item or type" });

  try {
    let fav = await Favorite.findOne({ user: req.userId });
    if (!fav) {
      fav = new Favorite({ user: req.userId });
    }

    if (!fav[type]) fav[type] = [];

    if (fav[type].includes(item)) {
      // remove if already exists
      fav[type] = fav[type].filter(i => i !== item);
    } else {
      // add new favorite
      fav[type].push(item);
    }

    await fav.save();
    res.json({ success: true, favorites: fav });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
