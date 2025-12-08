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

// GET products by vendor (also populate)
router.get("/vendor/:vendorId", async (req, res) => {
  try {
    const { vendorId } = req.params;
    const products = await Product.find({ vendorId })
      .populate("vendorId", "name")
      .populate("categoryId", "name");
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products by vendor" });
  }
});

// GET products by category (also populate)
router.get("/category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ categoryId })
      .populate("vendorId", "name")
      .populate("categoryId", "name");
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products by category" });
  }
});
