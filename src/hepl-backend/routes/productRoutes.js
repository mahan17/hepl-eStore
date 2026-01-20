import express from "express";
import Product from "../models/Product.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* ===========================
   🔹 GET ALL PRODUCTS (PUBLIC)
   =========================== */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

/* ===========================
   🔹 ADD PRODUCT (ADMIN ONLY)
   =========================== */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, price, category } = req.body;

    const product = new Product({
      title,
      price,
      category,
      image: req.file ? `/uploads/${req.file.filename}` : ""
    });

    await product.save();
    res.status(201).json(product);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product" });
  }
});

/* ===========================
   🔹 UPDATE PRODUCT (ADMIN)
   =========================== */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, price, category } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ Update fields
    product.title = title;
    product.price = price;
    product.category = category;

    // ✅ Update image ONLY if new image uploaded
    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    await product.save();

    res.json(product);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

/* ===========================
   🔹 DELETE PRODUCT (ADMIN)
   =========================== */
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ Delete image if exists
    if (product.image) {
      const imagePath = path.join(__dirname, "..", product.image);

      // check file exists before deleting
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
