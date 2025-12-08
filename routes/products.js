import express from "express";
import {
  getProductsByCategory,
  getProductsByVendorAndCategory,
  getAllProducts,
  createProduct,
} from "../controllers/productController.js";

const router = express.Router();

// All products
router.get("/", getAllProducts);

// Products by category only
router.get("/category/:categoryId", getProductsByCategory);

// ⭐ Products by vendor + category (THE MAIN FIX)
router.get("/vendor/:vendorId/category/:categoryId", getProductsByVendorAndCategory);

// Create product
router.post("/", createProduct);

export default router;
