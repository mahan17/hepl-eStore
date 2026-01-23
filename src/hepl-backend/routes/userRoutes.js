import express from "express";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Address from "../models/Address.js";


const router = express.Router();

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
router.delete("/:id", async (req, res) => {
  try {
    // 1️⃣ Find user
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ❌ Prevent admin deletion
    if (user.role === "admin") {
      return res.status(403).json({ message: "Admin cannot be deleted" });
    }

    const username = user.username;

    // Delete user's cart
    await Cart.deleteOne({ username });

    // Delete user's orders
    await Order.deleteMany({ username });

    // Delete user
    await User.findByIdAndDelete(req.params.id);

    // Delete user's Address
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