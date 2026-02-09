import express from "express";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Address from "../models/Address.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Users
 *   description: Admin user management APIs
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       500:
 *         description: Failed to fetch users
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ==========================
   DELETE USER + CART + ORDERS (ADMIN ONLY)
========================== */
/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete user and related data (Admin only)
 *     description: Deletes user, cart, address, and orders. Admin users cannot be deleted.
 *     tags: [Admin Users]
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
 *         description: User and related data deleted successfully
 *       403:
 *         description: Admin cannot be deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to delete user
 */
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(403).json({ message: "Admin cannot be deleted" });
    }

    const username = user.username;

    await Cart.deleteOne({ username });
    await Order.deleteMany({ username });
    await User.findByIdAndDelete(req.params.id);
    await Address.deleteMany({ username });

    res.json({
      message: "User, cart, address and orders deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

export default router;
