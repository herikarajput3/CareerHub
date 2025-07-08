const express = require('express');
const { jwtAuthMiddleware } = require('../Middleware/jwt');

const router = express.Router();
require('../db');

const { register, login, updateProfile } = require('../Controllers/UserController');

router.post('/register', register);
router.post('/login', login);
router.put('/profile/update/:id', jwtAuthMiddleware, updateProfile);

const { companyRegister, getCompanies, getCompany, updateCompany } = require('../Controllers/CompanyController');


router.post('/company/register', jwtAuthMiddleware, companyRegister);
router.get('/companies', jwtAuthMiddleware, getCompanies);
router.get('/company/:id', jwtAuthMiddleware, getCompany);
router.put('/company/update/:id', jwtAuthMiddleware, updateCompany);

const { postJob, getJobById, getJobs, getJobsByCompany } = require('../Controllers/JobController');

router.post('/job/post', jwtAuthMiddleware, postJob);
router.get('/jobs', jwtAuthMiddleware, getJobs);
router.get('/job/:id', jwtAuthMiddleware, getJobById);
router.get('/jobsByCompany', jwtAuthMiddleware, getJobsByCompany);

const { applyJob, getAppliedJobs, getApplicants, updateStatus } = require('../Controllers/ApplicationController');

router.get('/applyJob/:id', jwtAuthMiddleware, applyJob);
router.get('/appliedJobs', jwtAuthMiddleware, getAppliedJobs);
router.get('/applicants/:id', jwtAuthMiddleware, getApplicants);
router.put('/updateStatus/:id', jwtAuthMiddleware, updateStatus);

module.exports = router;
