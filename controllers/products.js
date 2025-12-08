import Product from "../models/Product.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("vendorId", "name")
      .populate("categoryId", "name");

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({ categoryId })
      .populate("vendorId", "name")
      .populate("categoryId", "name");

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ⭐ Get products by Vendor AND Category (THE FIX)
export const getProductsByVendorAndCategory = async (req, res) => {
  try {
    const { vendorId, categoryId } = req.params;

    const products = await Product.find({
      vendorId,
      categoryId,
    })
      .populate("vendorId", "name")
      .populate("categoryId", "name");

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
