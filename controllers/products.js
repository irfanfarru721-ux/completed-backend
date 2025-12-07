import Product from "../models/Product.js";

// ⭐ GET PRODUCTS BY CATEGORY
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({ categoryId })
      .populate("vendorId", "name")
      .populate("categoryId", "name");

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found in this category" });
    }

    res.json(products);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
