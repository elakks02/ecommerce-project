// clear.js
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const { MONGODB_URI } = process.env;

async function clearProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const result = await Product.deleteMany({});
    console.log(`Deleted ${result.deletedCount} products`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error clearing products:', err);
    process.exit(1);
  }
}

clearProducts();