// routes/clientRoutes.js
import express from 'express';
import {
    createCard,
    updateCard,
    getAllCard,
    deleteCard,
    getCardById,
    createRole,
    updateRole,
    deleteRole,
} from '../Controllers/futureCardController';
import { authorizeRoles } from '../Middleware/verifyToken';
import { paginationMiddleware } from '../Middleware/pagination';

const router = express.Router();

router.post('/', authorizeRoles(), createCard);
router.post('/:id', authorizeRoles(), createRole);

router.get('/', authorizeRoles(), paginationMiddleware, getAllCard);
router.get('/public', paginationMiddleware, getAllCard);

router.get('/:id', authorizeRoles(), paginationMiddleware, getCardById);

router.put('/:id', authorizeRoles(), updateCard);

router.put('/role/:id', authorizeRoles(), updateRole);

router.delete('/:id', authorizeRoles(), deleteCard);

router.delete('/role/:id', authorizeRoles(), deleteRole);

export default router;
