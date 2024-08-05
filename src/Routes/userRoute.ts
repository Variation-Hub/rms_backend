import * as express from 'express';
import {
    createACRUser,
    createUser,
    loginACRUser,
    loginUser,
    updateUser,
} from '../Controllers/userController';
import { singleFileUpload } from '../Util/multer';

const userRoutes = express.Router();

userRoutes.post("/register", singleFileUpload("profilePicture"), createUser);
userRoutes.post("/login", loginUser);
userRoutes.patch("/update/:id", updateUser);

//ACR user routes
userRoutes.post("/acr/register", createACRUser);
userRoutes.post("/acr/login", loginACRUser);

export default userRoutes;