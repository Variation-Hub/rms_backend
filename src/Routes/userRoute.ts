import * as express from 'express';
import {
    createUser,
    loginUser,
    updateUser,
} from '../Controllers/userController';

const userRoutes = express.Router();

userRoutes.post("/register", createUser);
userRoutes.post("/login", loginUser);
userRoutes.patch("/update/:id", updateUser);

export default userRoutes;