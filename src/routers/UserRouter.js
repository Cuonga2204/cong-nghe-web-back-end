const express = require('express');
const userController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/AuthMiddleware');
const router = express.Router();


router.post('/sign-in', userController.loginUser);

module.exports = router;