// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number, default: 0 },
  image: { type: String, default: "" },
  description: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
