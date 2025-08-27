// src/controllers/admin.controller.js
const { ApplicationStatus, Role } = require('@prisma/client');
const prisma = require('../config/database');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/apiResponse');

// ✅ 1. Get all applications
exports.getAllApplications = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      include: {
        job: { select: { id: true, title: true, createdBy: { select: { id: true, fullName: true } } } },
        applicant: { select: { id: true, fullName: true, email: true } }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    }),
    prisma.application.count()
  ]);

  sendSuccessResponse(res, 'Applications retrieved successfully', applications, 200, {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit)
  });
};

// ✅ 2. Get all jobs
exports.getAllJobs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      include: {
        createdBy: { select: { id: true, fullName: true, email: true } }
      },
      orderBy: { posted: 'desc' },
      skip,
      take: limit
    }),
    prisma.job.count()
  ]);

  sendSuccessResponse(res, 'Jobs retrieved successfully', jobs, 200, {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit)
  });
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
  const { status } = req.body;
  console.log("Updating application status:", status);

  if (!status || !Object.values(ApplicationStatus).includes(status)) {
    return sendErrorResponse(res, 'Valid status is required', 400);
  }

  const application = await prisma.application.findUnique({
    where: { id: req.params.id },
    include: { job: true }
  });
  if (!application) return sendErrorResponse(res, 'Application not found', 404);
  if (req.user.role !== Role.ADMIN && application.job.userId !== req.user.id) {
    return sendErrorResponse(res, 'Not authorized to update this application', 403);
  }

  const updatedApplication = await prisma.application.update({
    where: { id: req.params.id },
    data: { status },
    include: {
      job: { select: { id: true, title: true } },
      applicant: { select: { id: true, fullName: true, email: true } }
    }
  });

  const io = req.app.get('socketio');
  if (io) {
    io.to(`user-${application.userId}`).emit('application-status-changed', {
      applicationId: application.id,
      status,
      userId: application.userId
    });
  }

  sendSuccessResponse(res, 'Application status updated successfully', updatedApplication);
};

// ✅ 3. Get recent 8 jobs
exports.getRecentJobs = async (req, res) => {
  const jobs = await prisma.job.findMany({
    orderBy: { posted: 'desc' },
    take: 8,
    include: {
      createdBy: { select: { id: true, fullName: true } }
    }
  });

  sendSuccessResponse(res, 'Recent jobs retrieved successfully', jobs);
};

// ✅ 4. Analytics (counts)
exports.getAnalytics = async (req, res) => {
  const [jobsCount, applicationsCount, usersCount] = await Promise.all([
    prisma.job.count(),
    prisma.application.count(),
    prisma.user.count()
  ]);

  sendSuccessResponse(res, 'Analytics data retrieved successfully', {
    totalJobs: jobsCount,
    totalApplications: applicationsCount,
    totalUsers: usersCount
  });
};
