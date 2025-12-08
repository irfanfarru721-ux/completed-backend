// routes/products.js
import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsByVendor,
  getProductsByVendorAndCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  getVendorProductsGroupedByCategory,
} from "../controllers/products.js";

const router = express.Router();

// CRUD
router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Filters
router.get("/category/:categoryId", getProductsByCategory);
router.get("/vendor/:vendorId", getProductsByVendor);
router.get("/vendor/:vendorId/category/:categoryId", getProductsByVendorAndCategory);

// Optional: vendor -> grouped by category
router.get("/vendor-grouped/:vendorId", getVendorProductsGroupedByCategory);

export default router;
