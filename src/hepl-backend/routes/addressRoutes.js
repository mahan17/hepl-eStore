import express from "express";
import Address from "../models/Address.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: User address management
 */

/* 🔹 SAVE / UPDATE ADDRESS */
/**
 * @swagger
 * /api/address:
 *   post:
 *     summary: Save or update user address
 *     tags: [Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - fullName
 *               - phone
 *               - address
 *               - city
 *               - pincode
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: 12, MG Road
 *               city:
 *                 type: string
 *                 example: Chennai
 *               pincode:
 *                 type: string
 *                 example: "600001"
 *     responses:
 *       200:
 *         description: Address saved or updated successfully
 *       400:
 *         description: Username required
 *       500:
 *         description: Saving address failed
 */
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
/**
 * @swagger
 * /api/address:
 *   get:
 *     summary: Get address by username
 *     tags: [Address]
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: john_doe
 *     responses:
 *       200:
 *         description: Address fetched successfully
 *       400:
 *         description: Username required
 *       500:
 *         description: Fetching address failed
 */
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
/**
 * @swagger
 * /api/address:
 *   delete:
 *     summary: Delete address by username
 *     tags: [Address]
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: john_doe
 *     responses:
 *       200:
 *         description: Address deleted successfully
 *       500:
 *         description: Delete failed
 */
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
