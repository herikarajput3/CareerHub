const router = require('express').Router();

const { applyJob, getApplicants, getMyApplications, updateApplicationStatus } = require('../controllers/application.controller');
const { jwtAuthMiddleware } = require('../middleware/jwt');

router.post('/', jwtAuthMiddleware, applyJob);
router.get('/my', jwtAuthMiddleware, getMyApplications);
router.get('/job/:jobId', jwtAuthMiddleware, getApplicants);
router.put('/status', jwtAuthMiddleware, updateApplicationStatus);

module.exports = router