import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  username: { type: String, required: true },

  items: [
    {
      productId: String,
      title: String,
      price: Number,
      mrp: Number,
      quantity: Number,
      image: String,
    }
  ],

  totalAmount: Number,
  totalSavings: Number,
  paymentMethod: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);