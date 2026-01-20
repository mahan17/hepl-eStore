import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

/* 🔥 GET CART (GLOBAL) */
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.findOne();
    res.json(cart || { items: [], totalQuantity: 0 });
  } catch (error) {
    res.status(500).json({ message: "Fetching cart failed" });
  }
});

/* 🔥 SAVE CART (GLOBAL) */
router.post("/", async (req, res) => {
  try {
    let { items, totalQuantity } = req.body;

    // ✅ VALIDATE
    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid cart data" });
    }

    // 🔥 SANITIZE
    items = items.filter(item => item.quantity > 0);
    totalQuantity = items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    await Cart.findOneAndUpdate(
      {},
      { items, totalQuantity },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Saving cart failed" });
  }
});

export default router;
