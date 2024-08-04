import * as express from 'express';
import userRoutes from './userRoute';

const Routes = express.Router();

Routes.use("/user", userRoutes);


export default Routes; 
