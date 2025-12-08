import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  price: Number,
  stock: Number,
  image: String,
  description: String,
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
