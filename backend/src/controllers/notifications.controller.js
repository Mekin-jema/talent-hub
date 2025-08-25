// controllers/notifications.controller.js
const prisma = require('../config/database');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/apiResponse');

exports.getNotifications = async (req, res) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      application: {
        include: {
          job: { select: { title: true } }
        }
      }
    }
  });

  sendSuccessResponse(res, 'Notifications retrieved successfully', notifications);
};

exports.markAsRead = async (req, res) => {
  const { id } = req.params;

  const notification = await prisma.notification.update({
    where: { id, userId: req.user.id },
    data: { isRead: true }
  });

  sendSuccessResponse(res, 'Notification marked as read', notification);
};

exports.markAllAsRead = async (req, res) => {
  await prisma.notification.updateMany({
    where: { userId: req.user.id, isRead: false },
    data: { isRead: true }
  });

  sendSuccessResponse(res, 'All notifications marked as read');
};

exports.clearAll = async (req, res) => {
  await prisma.notification.deleteMany({
    where: { userId: req.user.id }
  });

  sendSuccessResponse(res, 'All notifications cleared');
};