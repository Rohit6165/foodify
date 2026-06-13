const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: String,
    customerPhone: String,
    customerAddress: String,
    orderType: String,
    items: Array,
    total: Number,
    status: {
      type: String,
      default: "Preparing your order",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
