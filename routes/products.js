import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// List all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("vendorId", "name")
      .populate("categoryId", "name");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get products by category
router.get("/category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ categoryId })
      .populate("vendorId", "name")
      .populate("categoryId", "name");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get products by vendor
router.get("/vendor/:vendorId", async (req, res) => {
  try {
    const { vendorId } = req.params;
    const products = await Product.find({ vendorId })
      .populate("vendorId", "name")
      .populate("categoryId", "name");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get products by vendor AND category
router.get("/vendor/:vendorId/category/:categoryId", async (req, res) => {
  try {
    const { vendorId, categoryId } = req.params;
    const products = await Product.find({ vendorId, categoryId })
      .populate("vendorId", "name")
      .populate("categoryId", "name");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
