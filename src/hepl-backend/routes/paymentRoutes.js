import Razorpay from "razorpay";
import express from "express";
import crypto from "crypto";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Razorpay payment and order verification
 */

/* ===========================
   CREATE ORDER
=========================== */
/**
 * @swagger
 * /api/payments/create-order:
 *   post:
 *     summary: Create Razorpay order
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 1499
 *     responses:
 *       200:
 *         description: Razorpay order created successfully
 */
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
/**
 * @swagger
 * /api/payments/verify:
 *   post:
 *     summary: Verify Razorpay payment and save order
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - razorpay_order_id
 *               - razorpay_payment_id
 *               - razorpay_signature
 *               - username
 *               - amount
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *                 example: order_LkP9XYZ
 *               razorpay_payment_id:
 *                 type: string
 *                 example: pay_LkP9ABC
 *               razorpay_signature:
 *                 type: string
 *               username:
 *                 type: string
 *                 example: john_doe
 *               amount:
 *                 type: number
 *                 example: 1499
 *     responses:
 *       200:
 *         description: Payment verified and order saved
 *       400:
 *         description: Invalid signature or cart empty
 */
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

  const cart = await Cart.findOne({ username });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: "Cart empty" });
  }

  const newOrder = new Order({
    username,
    items: cart.items,
    totalAmount: amount,
    paymentMethod: "Razorpay",
    paymentId: razorpay_payment_id,
  });

  await newOrder.save();

  cart.items = [];
  cart.totalQuantity = 0;
  cart.totalAmount = 0;
  await cart.save();

  res.json({ success: true });
});

export default router;