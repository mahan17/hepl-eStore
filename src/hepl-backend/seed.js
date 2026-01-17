import mongoose from "mongoose";
import fetch from "node-fetch";
import Product from "./models/Product.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/hepl";

const seedProducts = async () => {
  try {
    // Connect DB
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");

    // Fetch existing API data
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    // Clear old data (important)
    await Product.deleteMany();

    // Transform & save data
    const formattedProducts = products.map(p => ({
      title: p.title,
      description: p.description,
      price: p.price,
      category: p.category,
      image: p.image,
      stock: 20
    }));

    await Product.insertMany(formattedProducts);

    console.log("Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();