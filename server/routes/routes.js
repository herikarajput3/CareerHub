const { userRegister, userLogin } = require('../controllers/userController');
const { jwtAuthMiddleware } = require('../middleware/jwt');

const router = require('express').Router()

// user routes
router.post('/register', userRegister);
router.post('/login', userLogin);

module.exports = router