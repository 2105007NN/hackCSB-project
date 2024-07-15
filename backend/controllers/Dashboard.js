import dbPromise from '../db/db_init.js';
import catchAsync from '../utils/catchAsync.js';
import sendResponse from '../utils/sendResponse.js';
import { promisify } from 'util';
import fs from 'fs';
const readFileAsync = promisify(fs.readFile);


const getQuote = catchAsync(async (req, res) => {
    const q = await readFileAsync('./db/Happiness.json')
    const quotes = JSON.parse(q)
    
    const date = new Date();
    const dayOfYear = Math.floor(
        (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
        Date.UTC(date.getFullYear(), 0, 0)) /
        24 / 60 / 60 / 1000
    );
    const quoteIndex = dayOfYear % quotes.length;
    const result = quotes[quoteIndex]

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "quote retrieved successfully",
        data: result,
    });
})


export const DashboardController = {
    getQuote,
}