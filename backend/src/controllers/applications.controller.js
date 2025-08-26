const prisma = require('../config/database');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/apiResponse');
const { ApplicationStatus, Role } = require('@prisma/client');


// Apply for a job (developer only)
exports.applyForJob = async (req, res) => {
  console.log(req.body);

  const {
    id, // jobId
    data: { coverLetter, salaryExpectation, noticePeriod, resumeUrl },
  } = req.body;

  if (!id) {
    return sendErrorResponse(res, "Job ID is required", 400);
  }

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) return sendErrorResponse(res, "Job not found", 404);

  // Prevent duplicate applications
  const existingApplication = await prisma.application.findUnique({
    where: {
      userId_jobId: {
        userId: req.user.id,
        jobId: id,
      },
    },
  });
  if (existingApplication) {
    return sendErrorResponse(res, "Already applied to this job", 400);
  }

  // ✅ Create application with correct jobId
  const application = await prisma.application.create({
    data: {
      userId: req.user.id,
      jobId: id, // <-- this is the fix
      resumeUrl: resumeUrl || null,
      coverLetter: coverLetter || null,
      salaryExpectation: salaryExpectation || null,
      noticePeriod: noticePeriod || null,
    },
    include: {
      job: {
        include: {
          createdBy: { select: { id: true, fullName: true, email: true } },
        },
      },
      applicant: { select: { id: true, fullName: true, email: true } },
    },
  });

  // Notify employer via socket
  const io = req.app.get("socketio");
  if (io) io.to(`employer-${job.userId}`).emit("new-application", application);

  sendSuccessResponse(res, "Application submitted successfully", application, 201);
};

// Get all applications (admin only)
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

// Get user's applications
// controller
exports.getUserApplications = async (req, res) => {
  try {
    const userId = req.user.id; // get logged-in user id
    console.log("Fetching applications for user ID:", userId);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where: { userId },
        include: {
          job: {
            include: {
              createdBy: { select: { id: true, fullName: true, email: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.application.count({ where: { userId } }),
    ]);

    sendSuccessResponse(res, 'User applications retrieved successfully', applications, 200, {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 'Failed to retrieve user applications', 500);
  }
};

// Get applications for a job
exports.getJobApplications = async (req, res) => {
  const id = req.params.id;
  const job = await prisma.job.findUnique({ where: { id: id } });

  if (!job) return sendErrorResponse(res, 'Job not found', 404);
  if (req.user.role !== Role.ADMIN && job.userId !== req.user.id) {
    return sendErrorResponse(res, 'Not authorized to view these applications', 403);
  }

  const applications = await prisma.application.findMany({
    where: { id },
    include: { applicant: { select: { id: true, fullName: true, email: true } } },
    orderBy: { createdAt: 'desc' }
  });

  sendSuccessResponse(res, 'Job applications retrieved successfully', applications);
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
