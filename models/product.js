const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  drink: String,
  quantity: Number,
  cost: Number,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
