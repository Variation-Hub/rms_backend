import * as express from 'express';
import {
    createACRUser,
    createUser,
    loginACRUser,
    loginUser,
    updateUser,
    forgotUserPassword,
    resetPassword,
    referUser
} from '../Controllers/userController';
import { authorizeRoles } from '../Middleware/verifyToken';

const userRoutes = express.Router();

userRoutes.post("/register", createUser);
userRoutes.post("/login", loginUser);
userRoutes.patch("/update/:id", updateUser);
userRoutes.post("/forgot", forgotUserPassword)
userRoutes.post("/reset", resetPassword)
userRoutes.post("/refer", authorizeRoles(), referUser)

//ACR user routes
userRoutes.post("/acr/register", createACRUser);
userRoutes.post("/acr/login", loginACRUser);

export default userRoutes;