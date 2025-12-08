import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/* ===========================
    CREATE PRODUCT
=========================== */
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===========================
    GET ALL PRODUCTS
=========================== */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("vendorId", "name email")
      .populate("categoryId", "name");

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===========================
    GET PRODUCTS BY CATEGORY
=========================== */
router.get("/category/:id", async (req, res) => {
  try {
    const products = await Product.find({ categoryId: req.params.id })
      .populate("vendorId", "name email")
      .populate("categoryId", "name");

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===========================
    GET PRODUCTS BY VENDOR
=========================== */
router.get("/vendor/:id", async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.params.id })
      .populate("vendorId", "name email")
      .populate("categoryId", "name");

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===========================
    GET PRODUCT BY ID
=========================== */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("vendorId", "name email")
      .populate("categoryId", "name");

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Product Not Found" });
  }
});

/* ===========================
    UPDATE PRODUCT
=========================== */
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===========================
    DELETE PRODUCT
=========================== */
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
