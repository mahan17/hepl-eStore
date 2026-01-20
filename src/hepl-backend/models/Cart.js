import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  items: {
    type: Array,
    default: [],
  },
  totalQuantity: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Cart", cartSchema);
