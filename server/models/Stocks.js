const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    time: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stock", StockSchema);
