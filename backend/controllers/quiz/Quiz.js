import express from 'express'
import dbPromise from '../db/db_init.js';
import catchAsync from '../utils/catchAsync.js';
import sendResponse from '../utils/sendResponse.js';


const createQuiz = catchAsync(async (req, res) => {
    const db = await dbPromise;
    const result = await db.all("SELECT * FROM users");

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "users retrieved successfully",
        data: result,
    });
})


const getQuiz = catchAsync(async (req,res) => {
    const db = await dbPromise;
    // const result = await db.all 


    
    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "quiz retrieved successfully",
        data: result,
    });
})




export const QuizController = {
    getUsers,
    
}