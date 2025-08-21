const express = require('express');
const { asyncHandler } = require('../utils/asyncHandler');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { Role } = require('@prisma/client');
const applicationController = require('../controllers/applications.controller');

const router = express.Router();

router.post('/', authenticateToken, requireRole(Role.DEVELOPER), asyncHandler(applicationController.applyForJob));
router.get('/', authenticateToken, requireRole(Role.ADMIN), asyncHandler(applicationController.getAllApplications));
router.get('/user/:userId', authenticateToken, asyncHandler(applicationController.getUserApplications));
router.get('/job/:jobId', authenticateToken, asyncHandler(applicationController.getJobApplications));
router.put('/:id/status', authenticateToken, asyncHandler(applicationController.updateApplicationStatus));

module.exports = router;
