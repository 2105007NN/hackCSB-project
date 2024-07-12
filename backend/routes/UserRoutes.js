import express from 'express'
import { UserController } from '../controllers/User.js';
const router = express.Router();

router.get("/", UserController.getUsers);

//user registration
router.post("/login")

export default router;

