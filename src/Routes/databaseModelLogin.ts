import * as express from 'express';
import {
    registerUserDBUser,
    loginUserDBUser
} from '../Controllers/databaseAccessController';

const userDBAcessRoutes = express.Router();

userDBAcessRoutes.post("/register/db", registerUserDBUser);
userDBAcessRoutes.post("/login/db", loginUserDBUser);

export default userDBAcessRoutes;