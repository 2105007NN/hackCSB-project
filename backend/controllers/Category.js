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

const getUserCategories = catchAsync(async (req,res)=> {
    const db = await dbPromise;
    const result = await db.all("SELECT * FROM user_category");


    sendResponse(res, {
        statusCode : 200,
        success : 200,
        message : "user categories retrieved successfully",
        data : result
    })
})
  
const getSingleUserReport = catchAsync(async (req,res)=> {
    const db = await dbPromise;
    const userId = req.user.userId;
    const result = await db.all(`SELECT uc.*, c.* 
        FROM user_category uc 
        JOIN categories c ON c.id = uc.category_id
        WHERE uc.user_id = ?
    `, [userId]);

    sendResponse(res, {
        statusCode : 200,
        success : 200,
        message : "single user categories retrieved successfully",
        data : result
    })
})
  
export const CategoryController = {
    getCategories,
    getUserCategories,
    getSingleUserReport
}