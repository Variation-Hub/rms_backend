import express from 'express';
import { createJob, getJobs, getJobById, updateJob, deleteJob, applicationJob, applicationJobUpdate } from '../Controllers/jobController';
import { paginationMiddleware } from '../Middleware/pagination';
import { authorizeRoles } from '../Middleware/verifyToken';

const router = express.Router();

router.post('/jobs', createJob);
router.post('/apply-job', applicationJob)
router.put('/apply-job', applicationJobUpdate)
router.get('/jobs', authorizeRoles(), paginationMiddleware, getJobs);
router.get('/jobs/:id', authorizeRoles(), getJobById);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);

export default router;
