// seed.js
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const { MONGODB_URI } = process.env;

const products = [
  // ---------- Beauty ----------
  { name: 'Face Wash', category: 'Beauty', price: 99, stock: 50, image: '/images/products/facewash.jpg', description: 'Refreshing face wash for daily cleansing.' },
  { name: 'Body Lotion', category: 'Beauty', price: 499, stock: 40, image: '/images/products/bodylotion.jpg', description: 'Moisturizing body lotion for smooth and soft skin.' },
  { name: 'Hair Serum', category: 'Beauty', price: 149, stock: 35, image: '/images/products/hairserum.jpg', description: 'Nourishing hair serum for smooth and shiny hair.' },
  { name: 'Perfume Spray', category: 'Beauty', price: 1199, stock: 30, image: '/images/products/perfume.jpg', description: 'Long‑lasting perfume spray with subtle fragrance.' },
  { name: 'Lip Balm', category: 'Beauty', price: 99, stock: 80, image: '/images/products/lipbalm.jpg', description: 'Hydrating lip balm to prevent dryness.' },

  // ---------- Sports ----------
  { name: 'Football', category: 'Sports', price: 599, stock: 30, image: '/images/products/football.jpg', description: 'Durable football suitable for outdoor play.' },
  { name: 'Cricket Bat', category: 'Sports', price: 1500, stock: 20, image: '/images/products/cricketbat.jpg', description: 'Wooden cricket bat ideal for practice and matches.' },
  { name: 'Badminton Racket', category: 'Sports', price: 999, stock: 25, image: '/images/products/badmintonracket.jpg', description: 'Lightweight badminton racket for all skill levels.' },
  { name: 'Skipping Rope', category: 'Sports', price: 300, stock: 60, image: '/images/products/skippingrope.jpg', description: 'Adjustable skipping rope for cardio workouts.' },
  { name: 'Yoga Mat', category: 'Sports', price: 499, stock: 45, image: '/images/products/yogamat.jpg', description: 'Non-slip yoga mat suitable for home workouts.' },

  // ---------- Toys ----------
  { name: 'Remote Car', category: 'Toys', price: 599, stock: 40, image: '/images/products/remotecar.jpg', description: 'Remote-controlled toy car for kids.' },
  { name: 'Building Blocks', category: 'Toys', price: 500, stock: 60, image: '/images/products/buildingblocks.jpg', description: 'Colorful building blocks to boost creativity.' },
  { name: 'Puzzle Set', category: 'Toys', price: 300, stock: 60, image: '/images/products/puzzle.jpg', description: 'Engaging puzzle set suitable for kids.' },
  { name: 'Soft Teddy', category: 'Toys', price: 699, stock: 45, image: '/images/products/teddy.jpg', description: 'Soft teddy bear, perfect as a gift.' },
  { name: 'Toy Train', category: 'Toys', price: 899, stock: 40, image: '/images/products/toytrain.jpg', description: 'Toy train set for kids to enjoy.' },

  // ---------- Electronics ----------
  { name: 'Wireless Earbuds', category: 'Electronics', price: 1500, stock: 50, image: '/images/products/airpods.jpg', description: 'Compact wireless earbuds with clear sound.' },
  { name: 'Bluetooth Speaker', category: 'Electronics', price: 1999, stock: 40, image: '/images/products/speaker.jpg', description: 'Portable Bluetooth speaker with deep bass.' },
  { name: 'Smartphone Stand', category: 'Electronics', price: 300, stock: 80, image: '/images/products/phonestand.jpg', description: 'Adjustable stand for smartphones.' },
  { name: 'Portable Charger', category: 'Electronics', price: 2000, stock: 60, image: '/images/products/charger.jpg', description: 'High-capacity portable charger.' },
  { name: 'USB-C Cable', category: 'Electronics', price: 299, stock: 100, image: '/images/products/usb.jpg', description: 'Durable USB-C charging cable.' },

  // ---------- Home & Kitchen ----------
  { name: 'Water Bottle', category: 'Home & Kitchen', price: 200, stock: 60, image: '/images/products/waterbottle.jpeg', description: 'Insulated stainless steel water bottle.' },
  { name: 'Ceramic Mug', category: 'Home & Kitchen', price: 299, stock: 100, image: '/images/products/mug.jpeg', description: 'Microwave-safe ceramic mug.' },
  { name: 'Non-stick Pan', category: 'Home & Kitchen', price: 1299, stock: 40, image: '/images/products/pan.jpg', description: 'Durable non-stick frying pan.' },
  { name: 'Chef Knife', category: 'Home & Kitchen', price: 499*6, stock: 50, image: '/images/products/knife.jpg', description: 'Sharp stainless steel chef knife.' },
  { name: 'Cutting Board', category: 'Home & Kitchen', price: 499, stock: 70, image: '/images/products/board.jpg', description: 'Bamboo cutting board.' },

  // ---------- Fashion ----------
  { name: 'Men T-Shirt', category: 'Fashion', price: 599, stock: 80, image: '/images/products/tshirt.jpg', description: 'Cotton crew-neck T-shirt.' },
  { name: 'Women Top', category: 'Fashion', price: 699, stock: 70, image: '/images/products/womentop.jpg', description: 'Lightweight casual top.' },
  { name: 'Jeans', category: 'Fashion', price: 1299, stock: 60, image: '/images/products/womenjeans.jpg', description: 'Slim-fit denim jeans.' },
  { name: 'Sneakers', category: 'Fashion', price: 1999, stock: 40, image: '/images/products/sneakers.jpg', description: 'Comfortable everyday sneakers.' },
  { name: 'Cap', category: 'Fashion', price: 299, stock: 100, image: '/images/products/cap.jpg', description: 'Adjustable baseball cap.' }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared products');

    await Product.insertMany(products);
    console.log(`Inserted products: ${products.length}`);

    await mongoose.disconnect();
    console.log('Disconnected');
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();