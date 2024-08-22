import dbPromise from "../db/db_init.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

const getChats = catchAsync(async (req, res) => {
  const db = await dbPromise;
  const { currentUser, targetUser } = req.query;
  const room_name = currentUser + "_" + targetUser;
  const alt_room_name = targetUser + "_" + currentUser;
  console.log(
    "Received request for chat history of room: ",
    room_name,
    alt_room_name
  );

  const room = await db.get(
    `SELECT id 
     FROM room 
     WHERE name = ? OR name = ?`,
    [room_name, alt_room_name]
  );

  console.log("room: ", room);

  const chats = await db.all(
    `SELECT * 
     FROM message 
     WHERE room_id = ?`,
    [room.id]
  );

  const result = { room_id: room.id, chats: chats };
  console.log(result);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "chats retrieved successfully",
    data: result,
  });
});

const getUsers = catchAsync(async (req, res) => {
  const db = await dbPromise;
  const result = await db.all(
    "SELECT * FROM users WHERE username LIKE ? AND role = 'client'",
    [`%${req.params.name}%`]
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "users retrieved successfully",
    data: result,
  });
});

const getConnectedUsers = catchAsync(async (req, res) => {
    const db = await dbPromise;
    const user = req.params.name
    const contactList = await db.all("SELECT id, read, updated_at FROM room WHERE user1 = ? OR user2 = ? ORDER BY datetime(updated_at) DESC", [user, user])
    const userlist = await Promise.all(contactList.map(async(contact) => {
        let t = await db.all(`SELECT * FROM message WHERE room_id = ?`, [contact.id])
        if(t.length > 0){
            const users = await db.get(`SELECT user1, user2 FROM room WHERE id = ?`, [contact.id])
            const receiver = (users.user1 === user) ? users.user2 : users.user1
            console.log(receiver);
            const uid = await db.get(`SELECT id, role from users WHERE username = ?`, [receiver])
            if(uid.role === 'therapist'){
                return undefined;
            }
            const data = {
                room_id: contact.id,
                id: uid.id,
                username: receiver,
                read: contact.read,
                updated_at: contact.updated_at
            }
            return data;
        }
    }))
    const result = userlist.filter(user => user !== undefined)

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "chats retrieved successfully",
        data: result,
    });
})

const getTherapists = catchAsync(async (req, res) => {
  const db = await dbPromise;
  const therapists = await db.all(
    "SELECT * FROM users WHERE role = 'therapist'"
  );
  const result = await Promise.all(
    therapists.map(async (therapist) => {
      const categories = await db.all(
        `SELECT C.category_name, C.color FROM user_category UC JOIN categories C 
                WHERE UC.category_id = C.id AND UC.user_id = ?`,
        [therapist.id]
      );
      return { ...therapist, categories: categories };
    })
  );
  console.log(result);
  //const result = usernames

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Therapists retrieved successfully",
    data: result,
  });
});
const getSimilarUsers = catchAsync(async (req, res) => {
  const db = await dbPromise;
  const name = req.params.name;
  const categories = await db.all(
    `SELECT category_name 
        FROM users U 
        JOIN user_category UC 
        JOIN categories C
        WHERE U.username = ? AND UC.user_id = U.id AND UC.category_id = C.id AND UC.score >= 70`,
    [name]
  );

  const filteredCategories = categories.map((c) => c.category_name);
  const placeholders = filteredCategories.map(() => "?").join(",");
  const params = [name, ...filteredCategories];

  const users = await db.all(
    `SELECT U.* 
        FROM users U 
        JOIN user_category UC 
        JOIN categories C
        WHERE U.id = UC.user_id AND UC.category_id = C.id AND U.role != 'therapist' AND U.username != ? AND UC.score >= 70 AND C.category_name IN (${placeholders})`,
    params
  );

  const r = await Promise.all(
    users.map(async (user) => {
      const categories = await db.all(
        `SELECT C.category_name, C.color 
        FROM user_category UC JOIN categories C 
        WHERE UC.category_id = C.id AND UC.user_id = ? AND UC.score >= 70`,
        [user.id]
      );
      return { ...user, categories: categories };
    })
  );
  const result = r.filter((user) => user !== undefined);
  console.log(result);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users with same categories retrieved successfully",
    data: result,
  });
});

export const ChatController = {
  getChats,
  getUsers,
  getConnectedUsers,
  getTherapists,
  getSimilarUsers,
};
