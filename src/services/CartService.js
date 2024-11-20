const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');

const addToCart = (userId, productId, quantity) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                resolve({
                    status: 'ERR',
                    message: 'Product not found',
                });
                return;
            }

            let cart = await Cart.findOne({ user: userId });
            if (!cart) {
                cart = new Cart({
                    user: userId,
                    items: [],
                    totalPrice: 0,
                });
            }

            const cartItem = cart.items.find((item) => item.product.toString() === productId);
            if (cartItem) {
                cartItem.quantity += quantity;
                cartItem.price = product.currentPrice * cartItem.quantity;
            } else {
                cart.items.push({
                    product: productId,
                    quantity,
                    price: product.currentPrice * quantity,
                });
            }

            cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price, 0);
            await cart.save();

            resolve({
                status: 'OK',
                message: 'Added to cart successfully',
                data: cart,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getCart = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOne({ user: userId }).populate('items.product');
            if (!cart) {
                resolve({
                    status: 'OK',
                    message: 'Cart is empty',
                    data: [],
                });
                return;
            }

            resolve({
                status: 'OK',
                message: 'Get cart successfully',
                data: cart,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const removeFromCart = (userId, productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                resolve({
                    status: 'ERR',
                    message: 'Cart not found',
                });
                return;
            }

            cart.items = cart.items.filter((item) => item.product.toString() !== productId);
            cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price, 0);
            await cart.save();

            resolve({
                status: 'OK',
                message: 'Removed from cart successfully',
                data: cart,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateQuantity = (userId, productId, quantity) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                resolve({
                    status: 'ERR',
                    message: 'Cart not found',
                });
                return;
            }

            const cartItem = cart.items.find((item) => item.product.toString() === productId);
            if (!cartItem) {
                resolve({
                    status: 'ERR',
                    message: 'Product not found in cart',
                });
                return;
            }

            cartItem.quantity = quantity;
            cartItem.price = cartItem.quantity * cartItem.price / cartItem.quantity;
            cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price, 0);
            await cart.save();

            resolve({
                status: 'OK',
                message: 'Updated quantity successfully',
                data: cart,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    updateQuantity,
};
