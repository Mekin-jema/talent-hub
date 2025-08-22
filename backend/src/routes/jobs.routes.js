const express = require('express');
const { asyncHandler } = require('../utils/asyncHandler');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { Role } = require('@prisma/client');
const jobController = require('../controllers/jobs.controller');

const router = express.Router();

router.get('/', asyncHandler(jobController.getJobs));
router.get('/:id', asyncHandler(jobController.getJobById));
router.post('/', authenticateToken,
     requireRole(Role.EMPLOYER), 
     asyncHandler(jobController.createJob));
router.put('/:id', authenticateToken, asyncHandler(jobController.updateJob));
router.delete('/:id', authenticateToken, asyncHandler(jobController.deleteJob));

module.exports = router;
