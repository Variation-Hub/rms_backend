import express from 'express';
import {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    updateJobCIR,
    deleteJob,
    applicationJob,
    applicationJobUpdate,
    fetchJobId,
    createJobCIR,
    fetchJobIdCIR,
    getJobsCIR,
    deleteCIRJob,
    getCIRJobApplication,
    getProjectsForCIR,
    fetchJobDetails
} from '../Controllers/jobController';
import { paginationMiddleware } from '../Middleware/pagination';
import { authorizeRoles } from '../Middleware/verifyToken';

const router = express.Router();

router.post('/jobs', authorizeRoles(), createJob);
// Create CIR Job
router.post('/jobs/cir', authorizeRoles(), createJobCIR);

router.post('/apply-job', authorizeRoles(), applicationJob)
router.put('/apply-job', authorizeRoles(), applicationJobUpdate)

router.get('/jobs', authorizeRoles(), paginationMiddleware, getJobs);
router.get('/jobs/cir', authorizeRoles(), paginationMiddleware, getJobsCIR);
router.get('/projects/cir', authorizeRoles(), getProjectsForCIR);

router.get('/jobs/:id', authorizeRoles(), getJobById);
router.get('/jobs/cir/:id', authorizeRoles(), getCIRJobApplication);

router.get("/job/fetch/id", authorizeRoles(), fetchJobId)
router.get("/job/fetch/id/cir", authorizeRoles(), fetchJobIdCIR)

// Fetch comprehensive job details
router.get("/job/details", authorizeRoles(), fetchJobDetails)

router.put('/jobs/:id', authorizeRoles(), updateJob);
// Update CIR Job
router.put('/jobs/cir/:id', authorizeRoles(), updateJobCIR);
router.delete('/jobs/:id', authorizeRoles(), deleteJob);
// Delete CIR Job
router.delete('/jobs/cir/:id', authorizeRoles(), deleteCIRJob);

export default router;
