import * as express from 'express';
import { createCard } from '../Controllers/cardController';
import { singleFileUpload } from '../Util/multer';
import { verifyToken } from '../Util/JwtAuth';
import { authorizeRoles } from '../Middleware/verifyToken';

const cardRoutes = express.Router();

cardRoutes.post("/create", authorizeRoles(), singleFileUpload("file"), createCard);

export default cardRoutes;