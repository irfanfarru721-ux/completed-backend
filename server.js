// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Routes
import publicUserRoutes from "./routes/users.js"; // public user routes
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
      "https://overfrontadmin.onrender.com", // production frontend
      "http://localhost:5173",               // local dev frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// -------------------- SECURITY & LOGGING --------------------
app.use(helmet());
app.use(morgan("dev"));

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

// -------------------- ROUTES --------------------
// Public user routes
app.use("/api/users", publicUserRoutes);

// Admin routes
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

// -------------------- ERROR HANDLING --------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// -------------------- START SERVER --------------------
app.listen(PORT, () =>
  console.log(`🚀 Admin backend running on PORT: ${PORT}`)
);
