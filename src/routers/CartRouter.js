const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');
const authMiddleware = require('../middleware/AuthMiddleware'); // Middleware xác thực

router.post('/add', cartController.addToCart);
router.get('/', cartController.getCart);
router.delete('/remove/:productId', cartController.removeFromCart);
router.put('/update/:productId', cartController.updateQuantity);
module.exports = router;
