 import express from 'express';
import { createContractDetails, getContractDetails, getContractDetailsById, updateContractDetails, deleteContractDetails } from '../Controllers/contractDetailsController';
import { paginationMiddleware } from '../Middleware/pagination';

const router = express.Router();

// Create contract details
router.post('/', createContractDetails);

// Get all contract details with pagination
router.get('/', paginationMiddleware, getContractDetails);

// Get contract details by ID
router.get('/:id', getContractDetailsById);

// Update contract details
router.put('/:id', updateContractDetails);

// Delete contract details
router.delete('/:id', deleteContractDetails);

export default router;