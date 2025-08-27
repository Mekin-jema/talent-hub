
const express =require("express")
const authRoutes = require('./auth.routes');
const jobRoutes = require('./jobs.routes');
const applicationRoutes = require('./applications.routes');
const adminRoutes =require("./admin.routes")

const router = express.Router();

// Routes
router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/admin', adminRoutes);

module.exports = router;