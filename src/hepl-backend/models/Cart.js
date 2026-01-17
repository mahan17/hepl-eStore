import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  items: Array,
  totalQuantity: Number,
});

export default mongoose.model("Cart", cartSchema);
