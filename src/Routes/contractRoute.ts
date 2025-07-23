import express from 'express';
import { paginationMiddleware } from '../Middleware/pagination';
import { authorizeRoles } from '../Middleware/verifyToken';
import { createContract, deleteContract, getAllContract, updateContract } from '../Controllers/contractController';

const router = express.Router();

router.post('/', authorizeRoles(), createContract);
router.get('/', authorizeRoles(), getAllContract);
router.put('/:id', authorizeRoles(), updateContract);
router.delete('/:id', authorizeRoles(), deleteContract);

export default router;