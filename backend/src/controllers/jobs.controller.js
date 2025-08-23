const prisma = require('../config/database');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/apiResponse');
const { Role } = require('@prisma/client');

// List all jobs with pagination
exports.getJobs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      include: {
        createdBy: { select: { id: true, fullName: true, email: true } },
        _count: { select: { applications: true } }
      },
      orderBy: {   posted: 'desc' },
      skip,
      take: limit
    }),
    prisma.job.count()
  ]);

  const pages = Math.ceil(total / limit);

  sendSuccessResponse(res, 'Jobs retrieved successfully', jobs, 200, {
    page, limit, total, pages
  });
};

// Get single job by ID
exports.getJobById = async (req, res) => {
  const job = await prisma.job.findUnique({
    where: { id: req.params.id },
    include: {
      createdBy: { select: { id: true, name: true, email: true } },
      applications: {
        include: {
          applicant: { select: { id: true, name: true, email: true } }
        }
      },
      _count: { select: { applications: true } }
    }
  });

  if (!job) return sendErrorResponse(res, 'Job not found', 404);

  sendSuccessResponse(res, 'Job retrieved successfully', job);
};
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      type,
      description,
      requirements,
      responsibilities,
      location,
      aboutCompany,
      logo,
      salary,
      category,
      featured,
      skills = []
    } = req.body;

    // Validate required fields
    if (!title || !description) {
      return sendErrorResponse(res, 'Title and description are required', 400);
    }

    // ✅ Create the job and insert skills
    const job = await prisma.job.create({
      data: {
        title,
        type,
        description,
        requirements: Array.isArray(requirements) ? requirements : [],
        responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
        location,
        aboutCompany,
        logo,
        salary,
        category,
        featured: featured || false,
        posted: new Date(),
        userId: req.user?.id, // when auth is ready

        // 👇 Insert skills directly tied to this job
        skills: {
          create: skills.map((skill) => ({
            name: skill
          }))
        }
      },
      include: {
        createdBy: { select: { id: true, fullName: true, email: true } },
        skills: true,
      },
    });

    return sendSuccessResponse(res, 'Job created successfully', job, 201);
  } catch (error) {
    console.error('Error creating job:', error.message);
    return sendErrorResponse(res, 'Failed to create job', 500);
  }
};


// Update job (owner or admin only)
exports.updateJob = async (req, res) => {
  const job = await prisma.job.findUnique({ where: { id: req.params.id } });

  if (!job) return sendErrorResponse(res, 'Job not found', 404);

  if (req.user.role !== Role.ADMIN && job.userId !== req.user.id) {
    return sendErrorResponse(res, 'Not authorized to update this job', 403);
  }

  const { title, description } = req.body;

  const updatedJob = await prisma.job.update({
    where: { id: req.params.id },
    data: {
      ...(title && { title }),
      ...(description && { description })
    },
    include: {
      createdBy: { select: { id: true, name: true, email: true } }
    }
  });

  sendSuccessResponse(res, 'Job updated successfully', updatedJob);
};

// Delete job (owner or admin only)
exports.deleteJob = async (req, res) => {
  const job = await prisma.job.findUnique({ where: { id: req.params.id } });

  if (!job) return sendErrorResponse(res, 'Job not found', 404);

  if (req.user.role !== Role.ADMIN && job.userId !== req.user.id) {
    return sendErrorResponse(res, 'Not authorized to delete this job', 403);
  }

  await prisma.job.delete({ where: { id: req.params.id } });

  sendSuccessResponse(res, 'Job deleted successfully');
};
