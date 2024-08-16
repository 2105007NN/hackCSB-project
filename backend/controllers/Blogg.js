import express from 'express'
import dbPromise from '../db/db_init.js';
import catchAsync from '../utils/catchAsync.js';
import sendResponse from '../utils/sendResponse.js';


const getBlogs = catchAsync(async (req, res) => {
    const db = await dbPromise;
    const result = await db.all("SELECT * FROM blogs");

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "users retrieved successfully",
        data: result,
    });
});


const createBlog = catchAsync(async (req, res) => {
    try {
        const db = await dbPromise;
        const { user_id, blog_content, blog_title, blog_category } = req.body;
        console.log(req.body)

        // Insert the new blog entry into the blogs table
        await db.run(
            `INSERT INTO blogs (user_id, blog_content, blog_title, blog_category) VALUES (?, ?, ?, ?)`,
            [user_id, blog_content, blog_title, blog_category]
        );

        // Send a success response
        res.status(201).json({
            status: 'success',
            message: 'Blog created successfully',
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to create blog',
            error: error.message,
        });
    }
});

const singleBlog = catchAsync(async(req,res)=>{ 
    try{
        const db = await dbPromise; 
        const result = await db.all(`select * from blogs where blog_id = ?`,[req.params.id])
    }catch(error){
        res.status(404).json({
            status : 'error',
            message : 'Failed to create blog', 
            error : error.message,
        });
    }
})

const blogComment = catchAsync(async (req,res)=>{
    try{
        const db = await dbPromise;
        const result = await db.all("SELECT * FROM blog_comments");

        sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "users retrieved successfully",
            data: result,
        });

    }catch(error){
        res.status(404).json({
            status : 'error',
            message : 'Failed to create blog', 
            error : error.message,
        });
    }
})



export const BlogController = {
    getBlogs, createBlog, singleBlog
}