import dbPromise from '../db/db_init.js';
import catchAsync from '../utils/catchAsync.js';
import sendResponse from '../utils/sendResponse.js';


const getChats = catchAsync(async (req, res) => {
    const db = await dbPromise;
    const {currentUser, targetUser} = req.query
    const room_name = currentUser + "_" + targetUser
    const alt_room_name = targetUser + "_" + currentUser
    console.log("Received request for chat history of room: ", room_name, alt_room_name)
    const room = await db.get("SELECT id FROM room WHERE name = ? OR name = ?", [room_name, alt_room_name])
    console.log("room: ", room);
    const chats = await db.all("SELECT * FROM message WHERE room_id = ?", [room.id])
    const result = {room_id: room.id, chats: chats}
    console.log(result);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "chats retrieved successfully",
        data: result,
    });
})

const getUsers = catchAsync(async (req, res) => {
    const db = await dbPromise
    const result = await db.all("SELECT * FROM users WHERE username LIKE ?", [`%${req.params.name}%`])

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "users retrieved successfully",
        data: result,
    })
})

const getConnectedUsers = catchAsync(async (req, res) => {
    const db = await dbPromise;
    const user = req.params.name
    const r1 = await db.all("SELECT user2 FROM room WHERE user1 = ?", [user])
    const r2 = await db.all("SELECT user1 FROM room WHERE user2 = ?", [user])
    const filtered1 = r1.map((u) => u.user2)
    const filtered2 = r2.map((u) => u.user1)
    const usernames = [...filtered1, ...filtered2]
    console.log(usernames);
    const result = await Promise.all(
        usernames.map(async (username) => {
            const t = await db.get("SELECT * FROM users WHERE username = ?", [username]);
            return t;
        })
    );
    console.log(result);
    //const result = usernames

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "chats retrieved successfully",
        data: result,
    });
})


export const ChatController = {
    getChats,
    getUsers,
    getConnectedUsers
}