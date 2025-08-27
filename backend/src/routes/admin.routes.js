const express = require('express');
const { getAllApplications, getAllJobs, getRecentJobs, getAnalytics, updateApplicationStatus } = require('../controllers/admin.controller');
const { requireRole, authenticateToken } = require('../middleware/auth');
const { Role } = require('@prisma/client');
const { asyncHandler } = require('../utils/asyncHandler');

const router = express.Router();

router.get('/applications', authenticateToken, requireRole(Role.ADMIN), asyncHandler(getAllApplications));
router.get('/jobs', authenticateToken, requireRole(Role.ADMIN), asyncHandler(getAllJobs));
router.get('/jobs/recent', authenticateToken, requireRole(Role.ADMIN), asyncHandler(getRecentJobs));
router.get('/analytics', authenticateToken, requireRole(Role.ADMIN), asyncHandler(getAnalytics));
router.patch('/applications/:id/status', authenticateToken, requireRole(Role.ADMIN), asyncHandler(updateApplicationStatus));


module.exports = router;
