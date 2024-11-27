const CartService = require('../services/CartService');

const addToCart = async (req, res) => {
    try {
        // const userId = req.headers['userid']; // Lấy userId từ header
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: 'userId, productId, and quantity are required' });
        }

        const response = await CartService.addToCart(userId, productId, quantity);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getCart = async (req, res) => {
    try {
        // const userId = req.headers['userid']; // Lấy userId từ header
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        const response = await CartService.getCart(userId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteFromCart = async (req, res) => {
    try {
        // const userId = req.headers['userid']; // Lấy userId từ header
        const productId = req.params.productId;
        const { userId } = req.query;

        if (!userId || !productId) {

            return res.status(400).json({ message: 'userId and productId are required' });
        }

        const response = await CartService.deleteFromCart(userId, productId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateQuantity = async (req, res) => {
    try {
        // const userId = req.headers['userid']; // Lấy userId từ header
        const { quantity, userId } = req.body;
        const productId = req.params.productId;

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: 'userId, productId, and quantity are required' });
        }

        const response = await CartService.updateQuantity(userId, productId, quantity);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    addToCart,
    getCart,
    deleteFromCart,
    updateQuantity,
};
