const express = require('express');
const { register, login, updateProfile } = require('../Controllers/UserController');
const { jwtAuthMiddleware } = require('../Middleware/jwt');

const router = express.Router();
require('../db');

router.post('/register', register);
router.post('/login', login);
router.put('/profile/update/:id', jwtAuthMiddleware, updateProfile)

module.exports = router;
