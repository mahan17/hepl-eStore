import express from "express";
import mongoose from "mongoose";
import authRoutes from './routes/auth.js';
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/hepl")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
  
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
