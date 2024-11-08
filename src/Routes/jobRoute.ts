import express from 'express';
import {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    applicationJob,
    applicationJobUpdate,
    fetchJobId,
    createJobCIR,
    fetchJobIdCIR,
    getJobsCIR
} from '../Controllers/jobController';
import { paginationMiddleware } from '../Middleware/pagination';
import { authorizeRoles } from '../Middleware/verifyToken';

const router = express.Router();

router.post('/jobs', authorizeRoles(), createJob);
router.post('/jobs/cir', authorizeRoles(), createJobCIR);

router.post('/apply-job', authorizeRoles(), applicationJob)
router.put('/apply-job', authorizeRoles(), applicationJobUpdate)

router.get('/jobs', authorizeRoles(), paginationMiddleware, getJobs);
router.get('/jobs/cir', authorizeRoles(), paginationMiddleware, getJobsCIR);

router.get('/jobs/:id', authorizeRoles(), getJobById);

router.get("/job/fetch/id", authorizeRoles(), fetchJobId)
router.get("/job/fetch/id/cir", authorizeRoles(), fetchJobIdCIR)

router.put('/jobs/:id', authorizeRoles(), updateJob);
router.delete('/jobs/:id', authorizeRoles(), deleteJob);

export default router;
