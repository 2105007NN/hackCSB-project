import express from 'express'
import { CategoryController } from '../controllers/Category.js';
import { UserRole } from '../utils/UserRole.js';
import auth from '../middlewares/auth.js';
const router = express.Router();

router.get("/", CategoryController.getCategories);

//get all users categories
router.get("/user-categories", CategoryController.getUserCategories);

//get single user category
router.get(
    "/user-category/single",
    auth(UserRole.client, UserRole.therapist) , 
    CategoryController.getSingleUserReport
);


export default router;