import express from 'express'
import dbPromise from '../db/db_init.js';
import catchAsync from '../utils/catchAsync.js';
import sendResponse from '../utils/sendResponse.js';
import { UserController } from '../controllers/UserController.js';
const router = express.Router();

router.get("/", UserController.get_users);



export default router;

