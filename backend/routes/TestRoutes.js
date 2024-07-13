import express from 'express'
import { TestController } from '../controllers/Test.js';
const router = express.Router();


//create test
router.post("/create-test", TestController.createTest);

//take test
router.post("/take-test", TestController.takeTest);

//get test
router.get("/get-test", TestController.getTest);

export default router;

