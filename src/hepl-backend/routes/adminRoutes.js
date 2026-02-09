import express from "express";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import adminAuth from "../middleware/adminAuth.js";
import Order from "../models/Order.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin user & order management
 */

/* 🔹 GET ALL USERS */
/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/users", adminAuth, async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

/* 🔹 DELETE USER */
/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a user (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete("/users/:id", adminAuth, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  await Cart.deleteOne({ username: req.params.username });
  res.json({ message: "User deleted" });
});

/* 🔹 GET ALL ORDERS */
/**
 * @swagger
 * /api/admin/orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/orders", adminAuth, async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

/* 🔹 UPDATE ORDER STATUS */
/**
 * @swagger
 * /api/admin/orders/{id}:
 *   put:
 *     summary: Update order status (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: Shipped
 *     responses:
 *       200:
 *         description: Order status updated
 *       401:
 *         description: Unauthorized
 */
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
/**
 * @swagger
 * /api/admin/orders/{id}:
 *   delete:
 *     summary: Delete an order (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete("/orders/:id", adminAuth, async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted" });
});

export default router;
