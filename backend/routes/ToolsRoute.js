import express from "express"
import { journalController, moodTrackerController } from "../controllers/Tools.js";




const toolsRouter = express.Router();
toolsRouter.post('/journal', journalController);
toolsRouter.post('/moodTracker', moodTrackerController);

export default toolsRouter;