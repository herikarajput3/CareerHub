const express = require('express');
const { jwtAuthMiddleware } = require('../Middleware/jwt');

const router = express.Router();
require('../db');

const { register, login, updateProfile } = require('../Controllers/UserController');

router.post('/register', register);
router.post('/login', login);
router.put('/profile/update/:id', jwtAuthMiddleware, updateProfile);

const { companyRegister, getCompanies, getCompany, updateCompany } = require('../Controllers/CompanyController');

router.post('/company/register', jwtAuthMiddleware,companyRegister);
router.get('/companies', jwtAuthMiddleware, getCompanies);
router.get('/company/:id', jwtAuthMiddleware, getCompany);
router.put('/company/update/:id', jwtAuthMiddleware, updateCompany);

module.exports = router;
