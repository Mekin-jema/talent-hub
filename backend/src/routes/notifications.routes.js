// routes/notifications.routes.js
const express = require('express');
const { asyncHandler } = require('../utils/asyncHandler');
const { authenticateToken } = require('../middleware/auth');
const notificationController = require('../controllers/notifications.controller');

const router = express.Router();

router.get('/', authenticateToken, asyncHandler(notificationController.getNotifications));
router.patch('/:id/read', authenticateToken, asyncHandler(notificationController.markAsRead));
router.patch('/read-all', authenticateToken, asyncHandler(notificationController.markAllAsRead));
router.delete('/', authenticateToken, asyncHandler(notificationController.clearAll));

module.exports = router;