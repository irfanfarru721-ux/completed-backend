import express from "express";
import {
  getProductsByCategory,
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById
} from "../controllers/productController.js";

const router = express.Router();

// ⭐ FIXED route
router.get("/category/:categoryId", getProductsByCategory);

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

export default router;
