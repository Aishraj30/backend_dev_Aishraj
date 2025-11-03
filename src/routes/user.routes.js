const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authMiddleware = require('../middleware/authuser');
const updateUser = require('../controller/update.controller');


// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes (require authentication)
router.get('/:id', authMiddleware, userController.getuser);
router.put('/:id', authMiddleware , updateUser    );

module.exports = router;