import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true, // ❗ NOT unique globally
  },
  items: [
    {
      productId: String,
      title: String,
      price: Number,
      image: String,
      quantity: Number,
    },
  ],
  totalQuantity: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Cart", cartSchema);