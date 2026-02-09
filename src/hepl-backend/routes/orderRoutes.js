import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: User and admin order management
 */

/* 🔴 ADMIN – GET ALL ORDERS (MUST BE FIRST) */
/**
 * @swagger
 * /api/orders/admin/all:
 *   get:
 *     summary: Get all orders (Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All orders fetched successfully
 *       500:
 *         description: Failed to fetch admin orders
 */
router.get("/admin/all", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Admin order fetch failed:", err);
    res.status(500).json({ message: "Failed to fetch admin orders" });
  }
});

/* 🟢 USER – GET ORDERS BY USERNAME */
/**
 * @swagger
 * /api/orders/{username}:
 *   get:
 *     summary: Get orders for a user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: john_doe
 *     responses:
 *       200:
 *         description: User orders fetched successfully
 *       500:
 *         description: Failed to fetch orders
 */
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
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - paymentMethod
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               paymentMethod:
 *                 type: string
 *                 example: COD
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Cart empty
 *       500:
 *         description: Order creation failed
 */
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
