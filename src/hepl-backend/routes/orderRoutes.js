import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const router = express.Router();

/* 🔴 ADMIN – GET ALL ORDERS (MUST BE FIRST) */
router.get("/admin/all", async (req, res) => {
  try {
    console.log("ADMIN ORDERS API HIT");

    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Admin order fetch failed:", err);
    res.status(500).json({ message: "Failed to fetch admin orders" });
  }
});

/* 🟢 USER – GET ORDERS BY USERNAME */
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    console.log("USER ORDERS API HIT:", username);

    const orders = await Order.find({ username }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Order fetch failed:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* 🟢 CREATE ORDER */
router.post("/", async (req, res) => {
  try {
    const { username, paymentMethod } = req.body;

    const cart = await Cart.findOne({ username });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const totalSavings = cart.items.reduce(
      (sum, i) => sum + ((i.mrp || i.price) - i.price) * i.quantity,
      0
    );

    const order = await Order.create({
      username,
      items: cart.items,
      totalAmount,
      totalSavings,
      paymentMethod,
    });

    cart.items = [];
    cart.totalQuantity = 0;
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    console.error("Order creation failed:", err);
    res.status(500).json({ message: "Order creation failed" });
  }
});

export default router;
