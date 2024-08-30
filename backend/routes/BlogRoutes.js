import express from 'express'
import { BlogController } from '../controllers/Blog.js';
const router = express.Router(); 

router.get('/blogs',BlogController.getBlogs)
router.get('/blogs/:category',BlogController.getBlogs)
router.get('/blogs/:blog_id',BlogController.getSpecificBlog);
router.get('/blog/comments/:blog_id',BlogController.getComments)
router.get('/blog_comments_child/:comment_id',BlogController.getChildComments)
router.post('/blog/create',BlogController.createBlog)
router.post('/blog/comment/create',BlogController.createComment)
router.put('/blog/like',BlogController.updateLike)
router.get('/blog/:blog_id/:user_id',BlogController.getIsLiked);

export default router;