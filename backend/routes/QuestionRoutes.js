import express from 'express'
import { TestController } from '../controllers/Test.js';
import { QuestionController } from '../controllers/Question.js';
const router = express.Router();


//create test
router.post("/create-test", TestController.createTest);

//take test
router.post("/take-test", TestController.takeTest);

//get test
router.get("/get-questions", QuestionController.getQuestions);

export default router;

