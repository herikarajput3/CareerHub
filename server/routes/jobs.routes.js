const { createJob, getJobs, getMyJobs, getJobById } = require('../controllers/job.controller');
const { jwtAuthMiddleware } = require('../middleware/jwt');
const express = require('express');
const router = express.Router();


router.post('/', jwtAuthMiddleware, createJob);
router.get('/', getJobs); // public route
router.get('/myJobs', jwtAuthMiddleware, getMyJobs);
router.get('/:id', jwtAuthMiddleware, getJobById);

module.exports = router;
