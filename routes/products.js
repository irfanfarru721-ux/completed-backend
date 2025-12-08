import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// ⭐ GET ALL PRODUCTS
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

// ⭐ GET PRODUCTS BY CATEGORY
router.get("/category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({ categoryId })
      .populate("vendorId", "name")
      .populate("categoryId", "name");

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products by category" });
  }
});

// ⭐ GET PRODUCTS BY VENDOR
router.get("/vendor/:vendorId", async (req, res) => {
  try {
    const { vendorId } = req.params;

    const products = await Product.find({ vendorId })
      .populate("vendorId", "name")
      .populate("categoryId", "name");

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching vendor products" });
  }
});

// ⭐ GET PRODUCTS BY VENDOR + CATEGORY
router.get("/vendor/:vendorId/category/:categoryId", async (req, res) => {
  try {
    const { vendorId, categoryId } = req.params;

    const products = await Product.find({ vendorId, categoryId })
      .populate("vendorId", "name")
      .populate("categoryId", "name");

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
});

export default router;
