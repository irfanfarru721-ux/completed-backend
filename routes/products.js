// GET products by vendor AND category
router.get("/vendor/:vendorId/category/:categoryId", async (req, res) => {
  try {
    const { vendorId, categoryId } = req.params;

    const products = await Product.find({ vendorId, categoryId })
      .populate("vendorId", "name")
      .populate("categoryId", "name");

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products by vendor and category" });
  }
});
