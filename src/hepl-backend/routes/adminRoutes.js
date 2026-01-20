import express from "express";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import adminAuth from "../middleware/adminAuth.js";
import Order from "../models/Order.js";

const router = express.Router();

/* 🔹 GET ALL USERS */
router.get("/users", adminAuth, async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

/* 🔹 DELETE USER */
router.delete("/users/:id", adminAuth, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  await Cart.deleteOne({ username: req.params.username });
  res.json({ message: "User deleted" });
});

/* 🔹 GET ALL ORDERS */
router.get("/orders", adminAuth, async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

/* 🔹 UPDATE ORDER STATUS */
router.put("/orders/:id", adminAuth, async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(order);
});

/* 🔹 DELETE ORDER */
router.delete("/orders/:id", adminAuth, async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted" });
});

export default router;
