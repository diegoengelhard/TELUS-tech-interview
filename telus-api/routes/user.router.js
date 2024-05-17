const express = require('express');
const router = express.Router();

// Import controller
const controller = require('../controllers/user.controller');

// Not implemented route
router.get('/', (req, res) => {
    res.status(501).send('NOT IMPLEMENTED: sevice currently unavailable');
});

// // Get user by id
router.get('/:id', controller.getUser);

module.exports = router;