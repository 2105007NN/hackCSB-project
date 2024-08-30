import { app, server, io } from "./app.js";
import dbPromise from "./db/db_init.js";
import globalErrorHandler from "./errors/globalErrorHandler.js";
import notFound from "./errors/notFound.js";
import catchAsync from "./utils/catchAsync.js";
import sendResponse from "./utils/sendResponse.js";
import UserRoutes from "./routes/UserRoutes.js"
import CategoryRoutes from "./routes/CategoryRoutes.js"
import AuthRoutes from "./routes/AuthRoutes.js"
import ChatRoutes from "./routes/ChatRoutes.js"
import TestRoutes from "./routes/TestRoutes.js"
import QuestionRoutes from "./routes/QuestionRoutes.js"
import ToolsRoute from './routes/ToolsRoute.js'
import DashboardRoutes from './routes/DashboardRoutes.js'
import 'dotenv/config'

const port = process.env.PORT || 3000;

// Use middleware and routes
app.get("/", (req, res) => {
	res.send("Express server started");
});

/****************
 * CHAT SOCKET
****************/

io.on("connection", async (socket) => {
	console.log("Client connected\n");

	socket.on("join_room", async (data) => {
		let room_name =
			data.currentUser.username.toLowerCase() +
			"_" +
			data.targetUser.username.toLowerCase();
		let alt_room_name =
			data.targetUser.username.toLowerCase() +
			"_" +
			data.currentUser.username.toLowerCase();
		const db = await dbPromise;
		const r = await db.all(
			"SELECT name FROM room WHERE name = ? OR name = ?",
			[room_name, alt_room_name]
		);
		if (r.length == 0) {
			await db.run(
				"INSERT INTO room (name, user1, user2) VALUES (?, ?, ?)",
				[
					room_name,
					data.currentUser.username.toLowerCase(),
					data.targetUser.username.toLowerCase(),
				]
			);
		} else {
			const rl = await db.all("SELECT name FROM room WHERE name = ?", [
				room_name,
			]);
			if (rl.length == 0) {
				room_name = alt_room_name;
			}
		}
		socket.join(room_name);
		console.log(
			`Username: ${data.currentUser.username} joined room: ${room_name}`
		);
	});

	socket.on("send_message", async (data) => {
		console.log("Received\n", data);
		const db = await dbPromise;
		await db.run(
			"INSERT INTO message (content, author, receiver, time, room_id) VALUES (?, ?, ?, ?, ?)",
			[data.content, data.author, data.receiver, data.time, data.room_id]
		);
		const users = await db.get("SELECT user1, user2 FROM room WHERE id = ?", [data.room_id])
		const author_num = (users.user1 === data.author) ? 1 : 2
		const receiver_num = (users.user1 === data.author) ? 2 : 1
		console.log(`author: ${data.author} ${author_num}, receiver: ${data.receiver} ${receiver_num}`);
		
		await db.run(
			`UPDATE room SET read_user${author_num} = TRUE WHERE id = ?`,
			[data.room_id]
		)
		await db.run(
			`UPDATE room SET read_user${receiver_num} = FALSE WHERE id = ?`,
			[data.room_id]
		)
		await db.run(
			`UPDATE room SET updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
			[data.room_id]
		)
		const room = await db.get("SELECT name FROM room WHERE id = ?", [
			data.room_id,
		]);
		socket.to(room.name).emit("receive_message", data);
	});

	socket.on("set_read", async(data) => {
		const db = await dbPromise;
		const users = await db.get("SELECT user1, user2 FROM room WHERE id = ?", [data.room_id])
		const user_num = (users.user1 === data.user) ? 1 : 2
		await db.run(`UPDATE room SET read_user${user_num} = TRUE WHERE id = ?`, [data.room_id])
	})

	socket.on("set_unread", async(data) => {
		const db = await dbPromise;
		const users = await db.get("SELECT user1, user2 FROM room WHERE id = ?", [data.room_id])
		const user_num = (users.user1 === data.user) ? 1 : 2
		await db.run(`UPDATE room SET read_user${user_num} = FALSE WHERE id = ?`, [data.room_id])
	})

	socket.on("disconnect", async () => {
		console.log("Client disconnected");
	});
});

/****************
 * AUTH
****************/
app.use('/users',UserRoutes)
app.use('/categories',CategoryRoutes)
app.use('/auth',AuthRoutes)
// app.use('/tests',TestRoutes)
app.use('/tests', TestRoutes)
app.use('/questions', QuestionRoutes)

/******** 
INTERACTIVE TOOLS  
********/

app.use('/tools', ToolsRoute)


/****************
 * CHAT
 ****************/
app.use(ChatRoutes);

/****************
 * DASHBOARD
 ****************/
app.use(DashboardRoutes)

// Eita delete koris na plz, database check korte shubidha hoy
app.get("/database", async (req, res) => {
	try {
		const db = await dbPromise;
		const users = await db.all("SELECT * FROM users");
		const rooms = await db.all("SELECT * FROM room");
		const message = await db.all("SELECT * FROM message");
		const journals = await db.all("SELECT * FROM journals");
		const mood_ratings = await db.all("SELECT * FROM mood_ratings");
		res.json({ users: users, rooms: rooms, messages: message, journals, mood_ratings });
	} catch (error) {
    console.log('Error in DB :', error);
  }
});

//global error handler
app.use(globalErrorHandler);
//Not Found
app.use(notFound);

server.listen(port, () => {
	console.log("Server running on port", port);
});

// app.use("/users", UserRouter);
