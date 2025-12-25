const express = require("express");
const Product = require("D/ecommerce-site/models/Product");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ message: "Product not found" });
    res.json(prod);
  } catch (err) {
    console.error("Get product error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create product (admin only)
router.post("/", auth("admin"), async (req, res) => {
  try {
    const { name, price, image, description, category } = req.body;

    if (!name || !price || !image || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const prod = await Product.create({
      name,
      price,
      image,
      description,
      category: category || "general"
    });

    res.status(201).json({ message: "Product created", product: prod });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;