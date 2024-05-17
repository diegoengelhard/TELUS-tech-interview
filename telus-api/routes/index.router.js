const express = require('express');
const router = express.Router();

// Imports all routers
const userRouter = require('./user.router');

// Defines all routes
router.use("/user", userRouter);

module.exports = router;