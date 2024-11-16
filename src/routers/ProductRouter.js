const express = require('express');
const productController = require('../controllers/ProductController');
const { authMiddleware, authUserMiddleware } = require('../middleware/AuthMiddleware');
const uploadImage = require('../middleware/uploadImageMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, uploadImage.single('imageUrl'), productController.createProduct);
router.put('/update/:id', productController.updateProduct);
router.get('/get-details/:id', productController.getDetailsProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/getAll', productController.getAllProduct);
module.exports = router;