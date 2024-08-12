// impoort express and create a router
const express = require('express');
const router = express.Router();

// Import individual route files
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Use the routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Export the router
module.exports = router;
