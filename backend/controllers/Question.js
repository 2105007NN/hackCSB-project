import express from 'express'
import dbPromise from '../db/db_init.js';
import catchAsync from '../utils/catchAsync.js';
import sendResponse from '../utils/sendResponse.js';


const getQuestions= catchAsync(async (req, res) => {
    const db = await dbPromise;
    const result = await db.all("SELECT * FROM questions");

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "questions retrieved successfully",
        data: result,
    });
})


export const QuestionController = {
    getQuestions,
    
}
