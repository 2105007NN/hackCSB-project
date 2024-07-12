import express from 'express'
import dbPromise from '../db/db_init.js';
import catchAsync from '../utils/catchAsync.js';
import sendResponse from '../utils/sendResponse.js';


const getCategories = catchAsync(async (req, res) => {
    const db = await dbPromise;
    const result = await db.all("SELECT * FROM categories");

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "users retrieved successfully",
        data: result,
    });
})


export const CategoryController = {
    getCategories,
    
}