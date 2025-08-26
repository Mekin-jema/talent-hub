const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  console.log('Token:', token);

  console.log('JWT_SECRET:', process.env.JWT_SECRET); // Debugging line

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded); // Debugging line
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, fullName: true, role: true }
    });
   console.log('Authenticated user:', user); // Debugging line
    if (!user) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user;
      console.log(user)
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: `Insufficient permissions. Required role: ${role}` });
    }
    next();
  };
};

module.exports = { authenticateToken, requireRole };
