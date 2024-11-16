const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: { type: String, },
    countInStock: { type: Number, },
    currentPrice: { type: Number, },
    oldPrice: { type: String },
    imageUrl: { type: String, required: true },
    backgroundUrl: { type: String, default: '/img/backGround.webp' },
    config: { type: [String] },
    description: { type: String }
},
    {
        timestamps: true
    });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;