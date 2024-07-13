import express from "express"
import {ChatController} from "../controllers/Chat.js"
const router = express.Router()

router.get("/chatlist", ChatController.getChats)
router.get("/search/users/:name", ChatController.getUsers)
router.get("/connected/users/:name", ChatController.getConnectedUsers)

export default router