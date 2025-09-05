import express from 'express';
import { 
    createOrUpdateBannerText, 
    getBannerTextByPageType, 
    getAllBannerTexts, 
    updateBannerTextById, 
    deleteBannerTextById 
} from '../Controllers/bannerController';
import { paginationMiddleware } from '../Middleware/pagination';
import { authorizeRoles } from '../Middleware/verifyToken';

const router = express.Router();

// Create or update banner text (upsert functionality)
router.post('/', authorizeRoles(), createOrUpdateBannerText);

// Get banner text by page type
router.get('/page/:page_type', getBannerTextByPageType);

// Get all banner texts with pagination and search
router.get('/', paginationMiddleware, getAllBannerTexts);

// Update banner text by ID
router.put('/:id', authorizeRoles(), updateBannerTextById);

// Delete banner text by ID
router.delete('/:id', authorizeRoles(), deleteBannerTextById);

export default router;
