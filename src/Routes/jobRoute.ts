import express from 'express';
import { createJob, getJobs, getJobById, updateJob, deleteJob, applicationJob, applicationJobUpdate, fetchJobId } from '../Controllers/jobController';
import { paginationMiddleware } from '../Middleware/pagination';
import { authorizeRoles } from '../Middleware/verifyToken';

const router = express.Router();

router.post('/jobs', authorizeRoles(), createJob);
router.post('/apply-job', authorizeRoles(), applicationJob)
router.put('/apply-job', authorizeRoles(), applicationJobUpdate)
router.get('/jobs', authorizeRoles(), paginationMiddleware, getJobs);
router.get('/jobs/:id', authorizeRoles(), getJobById);
router.get("/fetch-jobid", authorizeRoles(), fetchJobId)
router.put('/jobs/:id', authorizeRoles(), updateJob);
router.delete('/jobs/:id', authorizeRoles(), deleteJob);

export default router;
