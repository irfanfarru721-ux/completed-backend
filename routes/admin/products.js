import express from 'express';
import Product from '../../models/Product.js';
import Category from '../../models/Category.js';
import { adminProtect } from '../../middleware/adminAuth.js';

const router = express.Router();

// Get all products
router.get('/', adminProtect, async (req, res) => {
  const list = await Product.find()
    .populate('vendorId')
    .populate('categoryId');
  res.json(list);
});

// Count products
router.get('/count', adminProtect, async (req, res) => {
  const total = await Product.countDocuments();
  res.json({ total });
});

// Create product
router.post('/', adminProtect, async (req, res) => {
  const p = new Product(req.body);
  await p.save();
  res.status(201).json(p);
});

// Update product
router.put('/:id', adminProtect, async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
});

// Delete product
router.delete('/:id', adminProtect, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
});

// ---------------- New Route ----------------
// Get products grouped by category for a vendor
router.get('/by-vendor/:vendorId', adminProtect, async (req, res) => {
  try {
    const vendorId = req.params.vendorId;

    // Get categories of this vendor
    const categories = await Category.find({ vendorId });

    // For each category, get products
    const result = await Promise.all(
      categories.map(async (cat) => {
        const products = await Product.find({ categoryId: cat._id });
        return {
          category: cat,
          products,
        };
      })
    );

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
