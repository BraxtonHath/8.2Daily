const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  drink: String,
  quantity: Number,
  totalCost: Number,
  purchasedTime: {
    type: Date,
    default: Date.now
  }
});

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
