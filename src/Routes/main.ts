import * as express from 'express';
import userRoutes from './userRoute';
import { deleteFiles, uploadFile } from '../Controllers/userController';
import { multipleFileUpload } from '../Util/multer';
import cardRoutes from './cardRoute';

const Routes = express.Router();

Routes.use("/user", userRoutes);
Routes.use("/card", cardRoutes);

Routes.post("/upload", multipleFileUpload('files', 5), uploadFile);
Routes.delete("/upload/delete", deleteFiles);

export default Routes; 
