const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      name: { type: String, required: true },
      amount: { type: String, required: true },
      image: { type: String, required: true },
      name: { type: String, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      }
    }
  ],
  shippingAddress: {
    fullname: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: Number, required: true },
  },
  paymentMethod: { type: String, required: true },
  itemsPrice: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: fasle },
  paiAt: { type: Date },
  idDelivered: { type: Boolean },
  deliveredAt: { type: Date },
},
  {
    timestamps: true
  });

const User = mongoose.model("Order", orderSchema);
module.exports = Order;