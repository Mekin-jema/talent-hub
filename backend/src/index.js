const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

const authRoutes = require('./routes/auth.routes');
const jobRoutes = require('./routes/jobs.routes');
const applicationRoutes = require('./routes/applications.routes');
const { errorHandler } = require('./middleware/errorHandler');
const { notFound } = require('./middleware/notFound');

// Load environment variables
dotenv.config();

// Initialize Prisma Client
const prisma = new PrismaClient();

// Create Express app
const app = express();
const httpServer = createServer(app);

// Initialize Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Make io accessible to our router
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'TalentHub API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API info endpoint
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

// Socket.io for real-time notifications
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join room for specific user
  socket.on('join-user-room', (userId) => {
    socket.join(`user-${userId}`);
    console.log(`User ${userId} joined their room`);
  });

  // Join room for specific employer
  socket.on('join-employer-room', (employerId) => {
    socket.join(`employer-${employerId}`);
    console.log(`Employer ${employerId} joined their room`);
  });

  // Handle application status updates
  socket.on('application-status-update', (data) => {
    socket.to(`user-${data.userId}`).emit('application-status-changed', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Store io instance for use in other files
app.set('socketio', io);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start server
const server = httpServer.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
  
  try {
    // Test database connection
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

  // Force close after 10 seconds
  setTimeout(() => {
    console.error('Forcing shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = app;
