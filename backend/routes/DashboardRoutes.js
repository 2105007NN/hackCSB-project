import express from "express"
import {DashboardController} from "../controllers/Dashboard.js"
const router = express.Router()

router.get("/quote", DashboardController.getQuote)

export default router