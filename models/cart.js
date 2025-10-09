const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true
  },

  cartItems: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
        required: true
      },
      qty: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true } 
    }
  ],

  totalPrice: {
    type: Number,
    required: true,
    default: 0
  }
}, 
{ timestamps: true });

module.exports = mongoose.model("cart", cartSchema);
