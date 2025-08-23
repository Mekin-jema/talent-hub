const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const routes = require('./routes/index.route');

const { errorHandler } = require('./middleware/errorHandler');
const { notFound } = require('./middleware/notFound');

dotenv.config();

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.use('/api/v1', routes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'TalentHub API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API info
app.get('/api', (req, res) => {
  res.json({
    name: 'TalentHub API',
    version: '1.0.0',
    description: 'Backend API for TalentHub Job Portal',
    endpoints: {
      auth: {
        login: 'POST /api/auth/login',
        register: 'POST /api/auth/register',
        logout: 'POST /api/auth/logout'
      },
      jobs: {
        list: 'GET /api/jobs',
        create: 'POST /api/jobs',
        get: 'GET /api/jobs/:id',
        update: 'PUT /api/jobs/:id',
        delete: 'DELETE /api/jobs/:id'
      },
      applications: {
        create: 'POST /api/applications',
        list: 'GET /api/applications',
        getUserApplications: 'GET /api/applications/user/:userId',
        getJobApplications: 'GET /api/applications/job/:jobId',
        updateStatus: 'PUT /api/applications/:id/status'
      }
    }
  });
});

// Errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received, starting graceful shutdown`);
  server.close(async () => {
    console.log('HTTP server closed');
    await prisma.$disconnect();
    console.log('Database connection closed');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Forcing shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = app;
