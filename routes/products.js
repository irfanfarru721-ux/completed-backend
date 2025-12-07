import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// 👉 USER — Get products by vendor grouped by category
router.get("/by-vendor/:vendorId", async (req, res) => {
  try {
    const vendorId = req.params.vendorId;

    const products = await Product.find({ vendorId })
      .populate("categoryId", "name")
      .sort({ "categoryId.name": 1 });

    const grouped = {};

    products.forEach((p) => {
      const cat = p.categoryId?._id;
      if (!cat) return;

      if (!grouped[cat]) {
        grouped[cat] = {
          category: {
            _id: p.categoryId._id,
            name: p.categoryId.name,
          },
          products: [],
        };
      }

      grouped[cat].products.push(p);
    });

    res.json(Object.values(grouped));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
