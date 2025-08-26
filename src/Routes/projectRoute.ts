import express from 'express';
import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    hardDeleteProject,
    getProjectStats,
    bulkUpdateProjectStatus,
    getPublicProjects
} from '../Controllers/projectController';
import { paginationMiddleware } from '../Middleware/pagination';
import { authorizeRoles } from '../Middleware/verifyToken';

const router = express.Router();

// Public API: Get projects with filters (no authentication required)
router.get('/public/projects', getPublicProjects);

// Create a new project
router.post('/projects', authorizeRoles(), createProject);

// Get all projects with pagination and filtering
router.get('/projects', authorizeRoles(), paginationMiddleware, getAllProjects);

// Get project statistics
router.get('/projects/stats', authorizeRoles(), getProjectStats);

// Get project by ID
router.get('/projects/:id', authorizeRoles(), getProjectById);

// Update project
router.put('/projects/:id', authorizeRoles(), updateProject);

// Soft delete project (set isActive to false)
router.delete('/projects/:id', authorizeRoles(), deleteProject);

// Hard delete project (permanent removal)
router.delete('/projects/:id/permanent', authorizeRoles(), hardDeleteProject);

// Bulk update project status
router.put('/projects/bulk/status', authorizeRoles(), bulkUpdateProjectStatus);

export default router;
