import express from "express";
import Category from "../models/Category.mjs";
import upload from "../middleware/uploadMiddleware.mjs";

const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new category
router.post("/", upload.single("icon"), async (req, res) => {
  try {
    const { name } = req.body;
    let iconData = "";

    if (req.file) {
      // Convert to base64 data URI (Vercel has no writable filesystem)
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      iconData = "data:" + req.file.mimetype + ";base64," + b64;
    } else if (req.body.icon) {
      iconData = req.body.icon;
    }

    if (!name || !iconData) {
      return res.status(400).json({ message: "Name and Icon are required" });
    }

    const newCategory = new Category({
      name,
      icon: iconData,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update category icon
router.put("/:id/icon", upload.single("icon"), async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    if (!req.file) {
      return res.status(400).json({ message: "Icon file is required" });
    }

    // Convert to base64 data URI (Vercel has no writable filesystem)
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    category.icon = "data:" + req.file.mimetype + ";base64," + b64;

    const updated = await category.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE category
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    await category.deleteOne();
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
