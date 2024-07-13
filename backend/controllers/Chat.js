import dbPromise from '../db/db_init.js';
import catchAsync from '../utils/catchAsync.js';
import sendResponse from '../utils/sendResponse.js';


const getChats = catchAsync(async (req, res) => {
    console.log("here\n", req.query);
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


export const ChatController = {
    getChats
    
}