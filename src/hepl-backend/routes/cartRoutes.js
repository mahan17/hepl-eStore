import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

/* 🟢 GET CART (USER-SPECIFIC) */
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const cart = await Cart.findOne({ username });
  res.json(cart || { items: [], totalQuantity: 0 });
});

router.put("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { productId, type } = req.body;

    const cart = await Cart.findOne({ username });
    if (!cart) return res.json({ items: [], totalQuantity: 0 });

    const item = cart.items.find(i => i.productId === productId);

    if (!item) return res.json(cart);

    if (type === "INC") item.quantity += 1;
    if (type === "DEC") item.quantity -= 1;
    if (type === "REMOVE") {
      cart.items = cart.items.filter(i => i.productId !== productId);
    }

    cart.items = cart.items.filter(i => i.quantity > 0);

    cart.totalQuantity = cart.items.reduce(
      (sum, i) => sum + i.quantity,
      0
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Cart update failed" });
  }
});

/* 🟢 SAVE CART (USER-SPECIFIC) */
router.post("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    let { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid cart data" });
    }

    // sanitize
    items = items.filter(item => item.quantity > 0);

    const totalQuantity = items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const cart = await Cart.findOneAndUpdate(
      { username },               // ✅ USER FILTER
      { items, totalQuantity },
      { upsert: true, new: true }
    );

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Saving cart failed" });
  }
});

router.delete('/clear/:username', async (req, res) => {
  try {
    const { username } = req.params;

    console.log("CLEAR CART API HIT");
    console.log("Username received:", username);

    const result = await Cart.findOneAndUpdate(
      { username },
      { items: [], totalQuantity: 0 },
      { new: true }
    );

    console.log("Update result:", result);

    if (!result) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to clear cart" });
  }
});




export default router;
