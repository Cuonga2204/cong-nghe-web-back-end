const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

router.post('/add', cartController.addToCart);
router.get('/', cartController.getCart);
router.delete('/delete/:productId', cartController.deleteFromCart);
router.put('/update/:productId', cartController.updateQuantity);
module.exports = router;
