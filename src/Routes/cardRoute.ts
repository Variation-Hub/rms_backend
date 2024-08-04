import * as express from 'express';
import { createCard } from '../Controllers/cardController';
import { singleFileUpload } from '../Util/multer';

const cardRoutes = express.Router();

cardRoutes.post("/create", singleFileUpload("file"), createCard);

export default cardRoutes;