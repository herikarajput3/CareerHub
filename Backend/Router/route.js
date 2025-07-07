const express = require('express');
const { register, login, updateProfile } = require('../Controllers/UserController');
const { jwtAuthMiddleware } = require('../jwt');

const router = express.Router();
require('../db');

router.post('/register', register);
router.post('/login',jwtAuthMiddleware, login);
router.put('/profile/update', updateProfile)

module.exports = router;
