import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: User cart management
 */

/* 🟢 GET CART (USER-SPECIFIC) */
/**
 * @swagger
 * /api/cart/{username}:
 *   get:
 *     summary: Get cart for a user
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: john_doe
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 *       500:
 *         description: Server error
 */
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const cart = await Cart.findOne({ username });
  res.json(cart || { items: [], totalQuantity: 0 });
});

/* 🟢 UPDATE CART ITEM (INC / DEC / REMOVE) */
/**
 * @swagger
 * /api/cart/{username}:
 *   put:
 *     summary: Update cart item quantity or remove item
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: username
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
 *               - productId
 *               - type
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 65af123abc456
 *               type:
 *                 type: string
 *                 enum: [INC, DEC, REMOVE]
 *                 example: INC
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       500:
 *         description: Cart update failed
 */
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
/**
 * @swagger
 * /api/cart/{username}:
 *   post:
 *     summary: Save full cart for a user
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: 65af123abc456
 *                     quantity:
 *                       type: number
 *                       example: 2
 *     responses:
 *       200:
 *         description: Cart saved successfully
 *       400:
 *         description: Invalid cart data
 *       500:
 *         description: Saving cart failed
 */
router.post("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    let { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid cart data" });
    }

    items = items.filter(item => item.quantity > 0);

    const totalQuantity = items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const cart = await Cart.findOneAndUpdate(
      { username },
      { items, totalQuantity },
      { upsert: true, new: true }
    );

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Saving cart failed" });
  }
});

/* 🟢 CLEAR CART */
/**
 * @swagger
 * /api/cart/clear/{username}:
 *   delete:
 *     summary: Clear cart for a user
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Failed to clear cart
 */
router.delete("/clear/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const result = await Cart.findOneAndUpdate(
      { username },
      { items: [], totalQuantity: 0 },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to clear cart" });
  }
});

export default router;