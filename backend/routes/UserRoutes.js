import express from 'express'
import { UserController } from '../controllers/User.js';
import auth from '../middlewares/auth.js';
import { UserRole } from '../utils/UserRole.js';
import { upload } from '../utils/multer.js';
const router = express.Router();

router.get("/", UserController.getUsers);

//update user
router.patch(
    "/update-client-profile", 
    auth(UserRole.client, UserRole.therapist, UserRole.admin),
    UserController.updateClientProfile
);

//update profile picture
router.patch(
    "/update-avatar",
    auth(UserRole.client, UserRole.therapist, UserRole.admin),
    upload.single('file'),
    UserController.updateProfilePicture
)


export default router;

