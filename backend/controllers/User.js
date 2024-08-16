import express from 'express'
import dbPromise from '../db/db_init.js';
import catchAsync from '../utils/catchAsync.js';
import sendResponse from '../utils/sendResponse.js';


const getUsers = catchAsync(async (req, res) => {
    const db = await dbPromise;
    const result = await db.all("SELECT * FROM users");

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "users retrieved successfully",
        data: result,
    });
})

const getMe = catchAsync(async (req,res)=> {
    const db = await dbPromise;
    const userId = req.user.userId;
    const result = await db.all('SELECT * FROM users WHERE id = ?', [userId]);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "user retrieved successfully",
        data: result,
    });
})


const updateClientProfile = catchAsync(async (req,res)=> {
    const db = await dbPromise;
    const {firstname, lastname, contactNo, gender, ageGroup} = req.body;
    const userId = req.user.userId;

    console.log('Updating user info:', { firstname, lastname, contactNo, gender, ageGroup });
    console.log('User ID:', userId);

    const updateUserInfo = await db.prepare(`
            UPDATE users 
            SET firstname = ?, lastname = ?, contactNo = ?, gender = ?, ageGroup = ?, updatedAt = CURRENT_TIMESTAMP
            WHERE id = ?
        `)
    await updateUserInfo.run(firstname, lastname, contactNo, gender, ageGroup, userId);


    const result = await db.get('SELECT * FROM users WHERE id = ?', [userId]);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "User updated successfully",
        data: result,
    });
})


const updateProfilePicture = catchAsync(async(req,res)=>{
    const db = await dbPromise;
    const userId = req.user.userId;
    // const userId = req.params.id;

    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }
    const { path } = req.file;

    const updateProfilePic = await db.prepare(`
            UPDATE users 
            SET profileImg = ?
            WHERE id = ?
    `);
    
    await updateProfilePic.run(path, userId);

    const result = await db.get('SELECT * FROM users WHERE id = ?', [userId]);
    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Updated profile picture successfully",
        data: result,
    });
})


export const UserController = {
    getUsers,
    updateClientProfile,
    updateProfilePicture,
    getMe
}
