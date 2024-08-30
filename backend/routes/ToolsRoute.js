import express from "express"
import { editJournalController, moodTrackerController, viewJournalsController, sendMoodRatings, journalOverview } from "../controllers/Tools.js";




const toolsRouter = express.Router();
toolsRouter.post('/journal', editJournalController);
toolsRouter.post('/moodTracker', moodTrackerController);

toolsRouter.get('/view-journals', viewJournalsController);
toolsRouter.get('/mood-ratings', sendMoodRatings);
toolsRouter.get('/journal-overview', journalOverview)

export default toolsRouter;