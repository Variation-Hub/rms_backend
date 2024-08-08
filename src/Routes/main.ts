import * as express from 'express';
import userRoutes from './userRoute';
import { deleteFiles, getModelData, uploadFile } from '../Controllers/userController';
import { multipleFileUpload } from '../Util/multer';
import cardRoutes from './cardRoute';
import { paginationMiddleware } from '../Middleware/pagination';

const Routes = express.Router();

Routes.use("/user", userRoutes);
Routes.use("/card", cardRoutes);

Routes.post("/upload", multipleFileUpload('files', 5), uploadFile);
Routes.delete("/upload/delete", deleteFiles);
Routes.get("/model/list", paginationMiddleware, getModelData);

export default Routes; 
