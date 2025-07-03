import * as express from 'express';
import {
    createACRUser,
    createUser,
    loginACRUser,
    loginUser,
    updateUser,
    forgotUserPassword,
    resetPassword,
    referUser,
    getUser,
    updateACRUser,
    resetacrPassword,
    getACRUsers,
    createAdmin,
    loginAdmin,
    forgotACRUserPassword,
    applyJobRole,
    getACRUsersWithApplicant,
    sendAcrJobApplicationMail,
    getCIRUsersWithApplicant
} from '../Controllers/userController';
import { singleFileUpload } from '../Util/multer';
import { authorizeRoles } from '../Middleware/verifyToken';
import { paginationMiddleware } from '../Middleware/pagination';

const userRoutes = express.Router();

userRoutes.post("/register", singleFileUpload("cv"), createUser);
userRoutes.get("/get/:id", getUser);
userRoutes.post("/login", loginUser);
userRoutes.patch("/update/:id", updateUser);
userRoutes.post("/forgot", forgotUserPassword)
userRoutes.post("/reset", resetPassword)
userRoutes.post("/refer", authorizeRoles(), referUser)
userRoutes.post("/apply-job/:job_id", authorizeRoles(), applyJobRole)
userRoutes.post("/cir-user-with-applicant", paginationMiddleware, authorizeRoles(), getCIRUsersWithApplicant);

//ACR user routes
userRoutes.post("/acr/register", createACRUser);
userRoutes.post("/acr/login", loginACRUser);
userRoutes.patch("/acr/update", authorizeRoles(), updateACRUser);
userRoutes.post("/acr/reset", authorizeRoles(), resetacrPassword)
userRoutes.get("/acr/list", paginationMiddleware, authorizeRoles(), getACRUsers)
userRoutes.post("/acr/forgot", forgotACRUserPassword)
userRoutes.post("/acr/user-with-applicant", paginationMiddleware, authorizeRoles(), getACRUsersWithApplicant);
userRoutes.post("/acr/send-mail", authorizeRoles(), sendAcrJobApplicationMail)

//Admin routes
userRoutes.post("/admin/register", createAdmin);
userRoutes.post("/admin/login", loginAdmin);


export default userRoutes;