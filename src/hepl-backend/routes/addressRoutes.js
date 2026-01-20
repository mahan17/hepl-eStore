import express from "express";
import Address from "../models/Address.js";

const router = express.Router();

/* 🔹 SAVE / UPDATE ADDRESS */
router.post("/", async (req, res) => {
  try {
    const { username, fullName, phone, address, city, pincode } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username required" });
    }

    const savedAddress = await Address.findOneAndUpdate(
      { username },
      { fullName, phone, address, city, pincode },
      { upsert: true, new: true }
    );

    res.status(200).json(savedAddress);
  } catch (error) {
    res.status(500).json({ message: "Saving address failed" });
  }
});

/* 🔹 GET ADDRESS BY USER */
router.get("/", async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ message: "Username required" });
    }

    const address = await Address.findOne({ username });
    res.status(200).json(address || null);
  } catch (error) {
    res.status(500).json({ message: "Fetching address failed" });
  }
});

/* 🔹 DELETE ADDRESS */
router.delete("/", async (req, res) => {
  try {
    const { username } = req.query;

    await Address.deleteOne({ username });
    res.status(200).json({ message: "Address deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
