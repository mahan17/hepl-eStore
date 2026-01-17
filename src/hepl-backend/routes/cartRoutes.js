import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const cart = await Cart.findOne();
  res.json(cart || { items: [], totalQuantity: 0 });
});

router.post("/", async (req, res) => {
  let { items, totalQuantity } = req.body;

  // 🔥 SANITIZE DATA (CRITICAL)
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

    res.json({ message: "Cart updated successfully" });
});

export default router;
