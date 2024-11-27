const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');
const { authUserMiddleware } = require('../middleware/AuthMiddleware');
router.post('/add', cartController.addToCart);
router.post('/', authUserMiddleware, cartController.getCart);
router.delete('/delete/:productId', authUserMiddleware, cartController.deleteFromCart);
router.put('/update/:productId', authUserMiddleware, cartController.updateQuantity);

module.exports = router;
