import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// List all products
router.get("/", async (req, res) => {
  const products = await Product.find()
    .populate("vendorId", "name")
    .populate("categoryId", "name");
  res.json(products);
});

// Get products by category
router.get("/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  const products = await Product.find({ categoryId })
    .populate("vendorId", "name")
    .populate("categoryId", "name");
  res.json(products);
});

// Get products by vendor
router.get("/vendor/:vendorId", async (req, res) => {
  const { vendorId } = req.params;
  const products = await Product.find({ vendorId })
    .populate("vendorId", "name")
    .populate("categoryId", "name");
  res.json(products);
});

// Get products by vendor AND category
router.get("/vendor/:vendorId/category/:categoryId", async (req, res) => {
  const { vendorId, categoryId } = req.params;
  const products = await Product.find({ vendorId, categoryId })
    .populate("vendorId", "name")
    .populate("categoryId", "name");
  res.json(products);
});

export default router; // <- must be default
