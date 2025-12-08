import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/users.js";
import moduleRoutes from "./routes/modules.js";
import vendorRoutes from "./routes/vendors.js";
import categoryRoutes from "./routes/categories.js";
import productRoutes from "./routes/products.js";   // user product routes

// Admin Routes
import adminAuthRoutes from "./routes/admin/auth.js";
import adminModuleRoutes from "./routes/admin/modules.js";
import adminVendorRoutes from "./routes/admin/vendors.js";
import adminCategoryRoutes from "./routes/admin/categories.js";
import adminProductRoutes from "./routes/admin/products.js";
import adminUserRoutes from "./routes/admin/users.js";

dotenv.config();
const app = express();

// -------------------- CORS --------------------
app.use(
  cors({
    origin: [
      "https://frontend-admin-lhhq.onrender.com",
      "https://frontend-frontend-wcvf.onrender.com",
      "https://new-frontend-snll.onrender.com",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// -------------------- MIDDLEWARE --------------------
app.use(express.json());

// -------------------- ENV + MONGO --------------------
const PORT = process.env.PORT || 5001;
const MONGO = process.env.MONGO_URI;

if (!MONGO) {
  console.error("❌ ERROR: MONGO_URI missing from .env");
  process.exit(1);
}

mongoose
  .connect(MONGO)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
    process.exit(1);
  });

// -------------------- USER ROUTES --------------------
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);   // User product routes
app.use("/api/modules", moduleRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/categories", categoryRoutes);

// -------------------- ADMIN ROUTES --------------------
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/modules", adminModuleRoutes);
app.use("/api/admin/vendors", adminVendorRoutes);
app.use("/api/admin/categories", adminCategoryRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/users", adminUserRoutes);

// -------------------- ROOT CHECK --------------------
app.get("/", (req, res) => {
  res.send("Admin backend running ✔");
});

// -------------------- START SERVER --------------------
app.listen(PORT, () =>
  console.log(`🚀 Admin backend running on PORT: ${PORT}`)
);
