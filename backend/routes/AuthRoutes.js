import express from 'express';
import { AuthController } from '../controllers/Auth.js';
import auth from '../middlewares/auth.js';
import { UserRole } from '../utils/UserRole.js';
const router = express.Router();

//user registration
router.post("/create-client", AuthController.clientRegistration)
router.post("/create-therapist", AuthController.therapistRegistration)

//user login
router.post("/login", AuthController.login)

//change password
router.patch(
    "/change-password",
    auth(UserRole.client, UserRole.therapist, UserRole.admin),
    AuthController.changePassword
)


export default router;