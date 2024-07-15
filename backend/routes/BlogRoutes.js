import express from 'express' 
import {BlogController} from '../controllers/Blogg.js'
const router = express.Router(); 

router.get("/",BlogController.getBlogs);
router.post("/create",BlogController.createBlog);
router.get("/:id",BlogController.singleBlog)
export default router; 
