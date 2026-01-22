import Razorpay from "razorpay";
import express from "express";
import crypto from "crypto";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const router = express.Router();

/* ===========================
   CREATE ORDER
=========================== */
router.post("/create-order", async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const { amount } = req.body;

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: `rcpt_${Date.now()}`,
  });

  res.json(order);
});

/* ===========================
   VERIFY + SAVE ORDER
=========================== */
router.post("/verify", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    username,
    amount,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false });
  }

  // ✅ GET CART ITEMS
  const cart = await Cart.findOne({ username });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: "Cart empty" });
  }

  // ✅ SAVE ORDER
  const newOrder = new Order({
    username,
    items: cart.items,
    totalAmount: amount,
    paymentMethod: "Razorpay",
    paymentId: razorpay_payment_id,
  });

  await newOrder.save();

  // ✅ CLEAR CART (DB)
  cart.items = [];
  cart.totalQuantity = 0;
  cart.totalAmount = 0;
  await cart.save();

  res.json({ success: true });
});

export default router;
