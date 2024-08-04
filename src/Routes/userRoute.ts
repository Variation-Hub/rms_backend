import * as express from 'express';
import {
    createUser,
    loginUser,
} from '../Controllers/userController';

const userRoutes = express.Router();

userRoutes.post("/register", createUser);
userRoutes.post("/login", loginUser);

export default userRoutes;