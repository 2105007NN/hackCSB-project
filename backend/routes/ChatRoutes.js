import express from "express"
import {ChatController} from "../controllers/Chat.js"
const router = express.Router()

router.get("/chatlist", ChatController.getChats)
router.get("/search/users/:name", ChatController.getUsers)
router.get("/connected/users/:name", ChatController.getConnectedUsers)
router.get("/therapists", ChatController.getTherapists)
router.get("/similar/user/:name", ChatController.getSimilarUsers)

export default router