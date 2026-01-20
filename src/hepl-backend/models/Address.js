import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: String,
  phone: String,
  address: String,
  city: String,
  pincode: String,
});

export default mongoose.model("Address", addressSchema);
