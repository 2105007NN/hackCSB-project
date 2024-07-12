import express from 'express';
import { AuthController } from '../controllers/Auth.js';
const router = express.Router();

//user registration
router.post("/create-client", AuthController.clientRegistration)
router.post("/create-therapist", AuthController.therapistRegistration)

router.post("/login", AuthController.login)


export default router;