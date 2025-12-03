import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import adminAuthRoutes from "./routes/admin/auth.js";
import adminModuleRoutes from "./routes/admin/modules.js";
import adminVendorRoutes from "./routes/admin/vendors.js";
import adminCategoryRoutes from "./routes/admin/categories.js";
import adminProductRoutes from "./routes/admin/products.js";
import adminUserRoutes from "./routes/admin/users.js";

dotenv.config();
const app = express();

// -------------------- CORS FIX --------------------
app.use(
  cors({
    origin: [
      "https://frontend-admin-lhhq.onrender.com",
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
