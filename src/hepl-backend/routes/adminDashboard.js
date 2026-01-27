import express from "express";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const router = express.Router();

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
