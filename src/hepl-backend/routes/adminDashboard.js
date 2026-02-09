import express from "express";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Dashboard
 *   description: Admin analytics & dashboard data
 */

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard analytics
 *     description: Returns user growth, monthly orders, and product category distribution
 *     tags: [Admin Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usersGrowth:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         example: M1
 *                       count:
 *                         type: number
 *                         example: 20
 *                 ordersMonthly:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         example: M1
 *                       orders:
 *                         type: number
 *                         example: 15
 *                 productsByCategory:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Electronics
 *                       value:
 *                         type: number
 *                         example: 10
 *       500:
 *         description: Dashboard API error
 */
router.get("/dashboard", async (req, res) => {
  try {
    const usersGrowth = await User.aggregate([
      { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const ordersMonthly = await Order.aggregate([
      { $group: { _id: { $month: "$createdAt" }, orders: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const productsByCategory = await Product.aggregate([
      { $group: { _id: "$category", value: { $sum: 1 } } }
    ]);

    res.json({
      usersGrowth: usersGrowth.map(u => ({ month: `M${u._id}`, count: u.count })),
      ordersMonthly: ordersMonthly.map(o => ({ month: `M${o._id}`, orders: o.orders })),
      productsByCategory: productsByCategory.map(p => ({ name: p._id, value: p.value })),
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard API error" });
  }
});

export default router;
