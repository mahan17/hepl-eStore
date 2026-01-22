import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    username: String,
    items: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        title: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: Number,
    paymentMethod: String,
    paymentId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);