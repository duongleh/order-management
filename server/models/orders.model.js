const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  id: Number,
  user: {
    id: Number,
    name: String,
    address: String,
    phone: String
  },
  products: [
    {
      id: Number,
      quantity: Number,
      subTotal: Number
    }
  ],
  payment: {
    type: {
      type: String
    },
    status: {
      type: String,
      enum: ["Success", "Pending", "Cancel"]
    }
  },
  warranty: String,
  status: {
    type: String,
    enum: ["Success", "Pending", "Cancel"]
  },
  value: {
    subTotal: Number,
    tax: Number,
    discount: Number,
    shipping: Number,
    totalValue: Number
  }
});

module.exports = mongoose.model("orders", ordersSchema);
