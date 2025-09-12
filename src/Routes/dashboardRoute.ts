import express from 'express';
import { getCIRDashboard } from '../Controllers/dashboardController';
import { authorizeRoles } from '../Middleware/verifyToken';

const router = express.Router();

// CIR Dashboard API
router.get('/cir-dashboard', authorizeRoles(), getCIRDashboard);

export default router;
