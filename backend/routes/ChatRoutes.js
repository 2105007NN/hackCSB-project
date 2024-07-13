import express from "express"
import {ChatController} from "../controllers/Chat.js"
const router = express.Router()

router.get("/chatlist", ChatController.getChats)

export default router