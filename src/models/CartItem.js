const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Liên kết với model Product
        required: true,
    },
    nameProduct: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    price: {
        type: Number, // Giá tại thời điểm thêm vào giỏ hàng
        required: true,
    },
});

module.exports = cartItemSchema;
