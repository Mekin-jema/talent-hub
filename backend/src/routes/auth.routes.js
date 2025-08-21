const express = require('express');
const { asyncHandler } = require('../utils/asyncHandler');
const { authenticateToken } = require('../middleware/auth');
const authController=require("../controllers/auth.controller")

const router = express.Router();

router.post('/register', asyncHandler(authController.register));
router.post('/login', asyncHandler(authController.login));
router.post('/logout', authenticateToken, asyncHandler(authController.logout));
router.get('/me', authenticateToken, asyncHandler(authController.getMe));

module.exports = router;
