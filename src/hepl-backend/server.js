import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import authRoutes from './middleware/auth.js';

import cors from "cors";
import path from "path";

import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboard.js";

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/payment", paymentRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/uploads", express.static("uploads"));

mongoose
  .connect("mongodb://127.0.0.1:27017/hepl")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
  
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
