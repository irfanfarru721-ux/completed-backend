// controllers/productController.js
import Product from "../models/Product.js";
import Category from "../models/Category.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("vendorId", "name")
      .populate("categoryId", "name");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get product by id
export const getProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id)
      .populate("vendorId", "name")
      .populate("categoryId", "name");
    if (!p) return res.status(404).json({ message: "Not found" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get products by category id
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ categoryId })
      .populate("vendorId", "name")
      .populate("categoryId", "name");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get products by vendor id
export const getProductsByVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const products = await Product.find({ vendorId })
      .populate("vendorId", "name")
      .populate("categoryId", "name");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get products by vendor + category (exact match)
export const getProductsByVendorAndCategory = async (req, res) => {
  try {
    const { vendorId, categoryId } = req.params;
    const products = await Product.find({ vendorId, categoryId })
      .populate("vendorId", "name")
      .populate("categoryId", "name");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Optional: group products by category for a vendor (folder-like)
export const getVendorProductsGroupedByCategory = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const categories = await Category.find();
    const result = [];
    for (const cat of categories) {
      const prods = await Product.find({ vendorId, categoryId: cat._id })
        .populate("vendorId", "name")
        .populate("categoryId", "name");
      if (prods.length) {
        result.push({
          category: { _id: cat._id, name: cat.name },
          products: prods,
        });
      }
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    const doc = new Product(req.body);
    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const doc = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
