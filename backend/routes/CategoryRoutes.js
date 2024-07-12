import express from 'express'
import dbPromise from '../db/db_init.js';
import catchAsync from '../utils/catchAsync.js';
import sendResponse from '../utils/sendResponse.js';
const router = express.Router();

router.get("/", catchAsync(async (req, res) => {
    const db = await dbPromise;
    const result = await db.all("SELECT * FROM categories");

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "categories retrieved successfully",
        data: result,
    });
}));


export default router;