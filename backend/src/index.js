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

// Allowed origins
const allowedOrigins = [
  'https://talent-hub-fawn.vercel.app', // frontend
  'http://localhost:3000',               // local dev
];

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Enable pre-flight requests for all route
// Routes
app.use('/api/v1', routes);

app.get("/",(req,res)=>{
  res.send("API is running")
 });

// Errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

 app.listen(PORT, async () => {
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




module.exports = app;
