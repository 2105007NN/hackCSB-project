import express from 'express'
import { TestController } from '../controllers/Test.js';
const router = express.Router();


//create test
router.post("/create-test", TestController.createTest);

//take test
router.post("/take-test", TestController.takeTest);

//take compulsory test
router.post("/take-compulsory-test", TestController.takeCompulsoryTest);

//get all tests
router.get("/get-tests", TestController.getTests);

//get a single test
router.get("/get-test/:testId", TestController.getSingleTest);

//get options 
router.get("/get-options", TestController.getOptions);

//get results for a certain test for a certain user
router.get("/get-result/:testId/:userId", TestController.getResult);

//get all the answers
router.get("/get-answers", TestController.getAnswers);


export default router;


