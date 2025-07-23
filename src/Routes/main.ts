import * as express from 'express';
import userRoutes from './userRoute';
import { deleteFiles, getModelData, uploadFile, downloadCsv } from '../Controllers/userController';
import { multipleFileUpload } from '../Util/multer';
import cardRoutes from './cardRoute';
import clientRoutes from './clientRoute'
import jobRouters from './jobRoute'
import contractRoutes from './contractRoute'
import { paginationMiddleware } from '../Middleware/pagination';
import userDBAcessRoutes from './databaseModelLogin';
import { authorizeRolesWithoutErrorDB } from '../Middleware/verifyTokenDBAccess';
import CandidateRoute from './candidateRoute'
import contractDetailsRoutes from './contractDetailsRoutes'
import futureCard from './futureCardRoute'

const Routes = express.Router();

Routes.use("/user", userRoutes);
Routes.use("/user", userDBAcessRoutes);
Routes.use("/card", cardRoutes);
Routes.use("/client", clientRoutes);
Routes.use("/acr", jobRouters)
Routes.use("/acr-contract", contractRoutes)
Routes.use("/acr-detail-contract", contractDetailsRoutes)
Routes.use("/candidate", CandidateRoute);
Routes.use("/futures/card", futureCard)

Routes.post("/upload", multipleFileUpload('files', 5), uploadFile);
Routes.delete("/upload/delete", deleteFiles);
Routes.get("/model/list", authorizeRolesWithoutErrorDB, paginationMiddleware, getModelData);
Routes.get("/model/download", downloadCsv);

export default Routes; 
