import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

/* 🔹 PLACE ORDER */
router.post("/", async (req, res) => {
  const { username, items, totalQuantity, address } = req.body;

  const order = new Order({
    username,
    items,
    totalQuantity,
    address,
  });

  await order.save();
  res.status(201).json({ message: "Order placed" });
});

export default router;
