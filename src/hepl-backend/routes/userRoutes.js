import express from "express";
import User from "../models/User.js";

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
   DELETE USER (ADMIN ONLY)
========================== */
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ❌ Prevent admin deletion
    if (user.role === "admin") {
      return res.status(403).json({ message: "Admin cannot be deleted" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User removed successfully" });

  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

export default router;
