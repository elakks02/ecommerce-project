require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const Product = require("./models/Product");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Fallback to frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Seed sample products (runs only once)
async function seedProducts() {
  const existing = await Product.find();
  if (existing.length > 0) {
    console.log("✅ Products already exist, skipping seeding");
    return;
  }

  const sampleProducts = [
    {
      name: "Wireless Headphones",
      price: 2999,
      image: "https://via.placeholder.com/300x200?text=Headphones",
      description: "High-quality wireless headphones with noise cancellation.",
      category: "electronics"
    },
    {
      name: "Smart Watch",
      price: 4999,
      image: "https://via.placeholder.com/300x200?text=Smart+Watch",
      description: "Track your fitness and stay connected.",
      category: "wearables"
    },
    {
      name: "Gaming Mouse",
      price: 1499,
      image: "https://via.placeholder.com/300x200?text=Gaming+Mouse",
      description: "Ergonomic design with RGB lighting.",
      category: "accessories"
    }
  ];

  await Product.insertMany(sampleProducts);
  console.log("✅ Sample products seeded");
}

// ✅ Connect DB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected");

    // Seed products AFTER DB connection
    await seedProducts();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });