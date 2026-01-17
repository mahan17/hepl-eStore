import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
});

export default mongoose.model("Product", productSchema);
