import dbPromise from "../db/db_init.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";


const getBlogs = catchAsync(async (req, res) => {
    const db = await dbPromise;
    // console.log(req.params.category);
    // let result;
    const category = req.params.category;
    if (category) {
        const result = await db.all(`SELECT * FROM blogs join users where user_id = id and category= ?`, [category]);
        sendResponse(res, {
            statusCode: 200,
            succcess: true,
            message: 'Blogs retrieved successfully',
            data: result
        })
    }
    else {
        const result = await db.all(`SELECT * FROM blogs join users where user_id = id`);
        sendResponse(res, {
            statusCode: 200,
            succcess: true,
            message: 'Blogs retrieved successfully',
            data: result
        })
    }
})

const createBlog = catchAsync(async (req, res) => {
    console.log(req);
    const db = await dbPromise;
    const { user_id, category, content } = req.body;
    const result = await db.all(`INSERT INTO BLOGS (user_id,category,title,content,like_count) VALUES(?,?,?,?,?) RETURNING *`, [user_id, category, category, content, 0]);
    sendResponse(res, {
        statusCode: 200,
        succcess: true,
        message: 'Blog created successfully',
        data: result
    })
})

const getSpecificBlog = catchAsync(async (req, res) => {
    const db = await dbPromise;
    const result = await db.all(`SELECT * from blogs where blog_id = ${req.params.blog_id}`);
    sendResponse(res, {
        statusCode: 200,
        succcess: true,
        message: 'Blogs retrieved successfully',
        data: result
    })
})

const getComments = catchAsync(async (req, res) => {
    const db = await dbPromise;
    // const category = await db.all(`select category from blogs b where blog_id = ${req.params.blog_id}`)
    const author = await db.all(`select username from users where id = (select user_id from blogs where blog_id = ?)`, [req.params.blog_id]);
    console.log(author[0].username)
    const result = await db.all(`SELECT * from blog_comments bc join users u on bc.user_id = u.id join blogs b on b.blog_id = ${req.params.blog_id} where bc.blog_id = ${req.params.blog_id}`)
    // console.log(result);
    sendResponse(res, {
        statusCode: 200,
        succcess: true,
        message: 'Comments retrieved successfully',
        data: {
            data: result,
            author: author
        }
    })
})

const getChildComments = catchAsync(async (req, res) => {
    const db = await dbPromise;
    const result = await db.all(`select * from blog_comments where parent_id = ${req.params.comment_id}`)
    sendResponse(res, {
        statusCode: 200,
        succcess: true,
        message: 'Comments retrieved successfully',
        data: result
    })
})


/*****************
 *  CREATE COMMENT SECTION 
**********/

const createComment = catchAsync(async (req, res) => {
    const { blog_id, user_id, comment_text, parent_id } = req.body;
    const db = await dbPromise;
    const result = await db.all(`INSERT INTO blog_comments  (blog_id,user_id,comment_text,parent_id) values(?,?,?,?) returning *`, [blog_id, user_id, comment_text, parent_id]);
    sendResponse(res, {
        statusCode: 200,
        succcess: true,
        message: 'Comment created successfully!!',
        data: result
    })
})

const updateLike = catchAsync(async (req, res) => {
    const { blog_id, user_id } = req.body;
    // console.log(blog_id + ' ' + user_id)
    const db = await dbPromise;
    const check = await db.all(`select isLiked from blog_like where blog_id = ? and user_id = ?`, [blog_id, user_id]);
    // console.log(check[0])
    console.log(check)
    if (check.length === 0) {
        console.log('hello')
        const r = await db.all(`insert into blog_like (blog_id, user_id) values(?,?)`, [blog_id, user_id]);
        const result = await db.all(`update blogs set like_count = like_count+1 where blog_id = ?`,[blog_id]);
        sendResponse(res, {
            statusCode: 200,
            succcess: true,
            message: 'Like updated',
            data: r
        })
    }
    else {
        const result = check[0].isLiked === 1 ? await db.all(`update blogs set like_count = like_count-1 where blog_id = ? returning * `, [blog_id]) : await db.all(`update blogs set like_count = like_count+1 where blog_id = ? returning *`, [blog_id]);
        // const result = await db.all(`update blogs set like_count`)
        const rst = check[0].isLiked === 1 ? await db.all(`update blog_like set isLiked = FALSE where blog_id = ? and user_id = ? returning * `, [blog_id, user_id]) : await db.all(`update blog_like set isLiked = TRUE where blog_id = ? and user_id = ? returning * `, [blog_id, user_id]);
        console.log(rst)
        sendResponse(res, {
            statusCode: 200,
            succcess: true,
            message: 'Like updated',
            data: result
        })
    }
});


const getIsLiked = catchAsync(async(req,res)=>{
    console.log('hello')
    const {blog_id,user_id} = req.params;
    console.log(blog_id + ' ' + user_id);
    const db = await dbPromise;
    const result = await db.all(`select isLiked from blog_like where blog_id = ? and user_id = ?`,[blog_id,user_id]);
    console.log(result)
    sendResponse(res,{
        statusCode : 200, 
        succcess : true,
        message : 'Fetched successfully',
        data : result
    })
});

export const BlogController = {
    getBlogs,
    getSpecificBlog,
    getComments,
    getChildComments,
    createBlog,
    createComment,
    updateLike,
    getIsLiked
}