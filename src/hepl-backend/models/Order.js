import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  username: String,
  items: Array,
  totalQuantity: Number,
  address: Object,
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);
