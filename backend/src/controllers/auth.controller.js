const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/apiResponse');

// Register new user
exports.register = async (req, res) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name) {
    return sendErrorResponse(res, 'Missing required fields', 400);
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return sendErrorResponse(res, 'User already exists', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: role || 'DEVELOPER'
    }
  });

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const { password: _, ...userWithoutPassword } = user;

  sendSuccessResponse(res, 'User registered successfully', {
    token,
    user: userWithoutPassword
  }, 201);
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendErrorResponse(res, 'Email and password required', 400);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return sendErrorResponse(res, 'Invalid credentials', 401);

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return sendErrorResponse(res, 'Invalid credentials', 401);

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const { password: _, ...userWithoutPassword } = user;

  sendSuccessResponse(res, 'Login successful', {
    token,
    user: userWithoutPassword
  });
};

// Logout user
exports.logout = async (req, res) => {
  // Token blacklisting could be implemented here
  sendSuccessResponse(res, 'Logout successful');
};

// Get current user
exports.getMe = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, email: true, name: true, role: true, createdAt: true }
  });

  if (!user) return sendErrorResponse(res, 'User not found', 404);

  sendSuccessResponse(res, 'User data retrieved successfully', { user });
};
