import express from 'express'
import { CategoryController } from '../controllers/Category.js';
const router = express.Router();

router.get("/", CategoryController.getCategories);

export default router;