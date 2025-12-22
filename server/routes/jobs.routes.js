const { createJob, getJobs, getMyJobs, getJobById, updateJob, updateJobStatus, deleteJob } = require('../controllers/job.controller');
const { jwtAuthMiddleware } = require('../middleware/jwt');
const express = require('express');
const router = express.Router();


router.post('/', jwtAuthMiddleware, createJob);
router.get('/', getJobs); // public route
router.get('/myJobs', jwtAuthMiddleware, getMyJobs);
router.get('/:id', getJobById);
router.put('/:id', jwtAuthMiddleware, updateJob);
router.put('/:id/status', jwtAuthMiddleware, updateJobStatus);
router.delete('/:id', jwtAuthMiddleware, deleteJob);

module.exports = router;
