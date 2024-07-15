import dbPromise from "../db/db_init.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { verifyToken } from "../utils/handleJWT.js";

const editJournalController = async (req, res) => {
	try {
		const db = await dbPromise;
		const journalContent = req.body.content;
		const decodedToken = verifyToken(
			req.body.access_token,
			process.env.JWT_ACCESS_SECRET
		);
		const userId = decodedToken.userId;

		console.log("user Info ", decodedToken);

		const insertJournalSQL = `INSERT INTO journals(user_id, content, createdAt) 
            VALUES (?, ?, datetime('now'))`;

		await db.run(insertJournalSQL, [userId, journalContent]);

		const dbEntry = await db.all(
			`SELECT * FROM journals WHERE user_id = ${userId}`
		);
		console.log(`for userID : ${userId}, Journal Table : ${dbEntry}`);

		res.status(200).json({
			msg: "success",
			dbResponse: dbEntry,
		});
	} catch (error) {
		console.log("ERROR IN Journal CONTROLLER : ", error);
		res.status(500).json(new ApiError(400, "ERROR IN Journal CONTROLLER"));
	}
};

const moodTrackerController = async (req, res) => {
	try {
		const db = await dbPromise;
		const moodRating = req.body.moodRating;
		const decodedToken = verifyToken(
			req.body.access_token,
			process.env.JWT_ACCESS_SECRET
		);
		const userId = decodedToken.userId;
		const insertMoodRatingSQL = `INSERT INTO mood_ratings(user_id, rating, createdAt) 
            VALUES (?, ?, datetime('now'))`;

		await db.run(insertMoodRatingSQL, [userId, moodRating]);

		const dbEntry = await db.all(
			`SELECT * FROM mood_ratings WHERE user_id = ?`,
			[userId]
		);
		console.log(`for userID : ${userId}, mood_ratings Table : ${dbEntry}`);

		res.status(200).json({
			msg: "success",
			dbResponse: dbEntry,
		});
	} catch (error) {
		console.log("ERROR IN MOOD RATING CONTROLLER : ", error);
		res.status(500).json(
			new ApiError(400, "ERROR IN MOOD RATING CONTROLLER")
		);
	}
};

const viewJournalsController = async (req, res) => {
	try {
		const db = await dbPromise;
		const access_token = req.query.access_token;
		const decodedToken = verifyToken(
			access_token,
			process.env.JWT_ACCESS_SECRET
		);
		const userId = decodedToken.userId;
		const loggedJournals = await db.all(
			`SELECT * FROM journals WHERE user_id = ? ORDER BY createdAt`,
			[userId]
		);
		// const loggedMoods = await db.all(`SELECT * FROM mood_ratings WHERE user_id = ? ORDER BY createdAt`, [userId])

		// console.log('in view journals, request query : ', req.query);
		res.status(200).json({
			msg: "SUCCESS",
			journals: loggedJournals,
		});
	} catch (error) {
		res.status(500).json(
			new ApiError(500, "ERROR IN VIEW JOURNALS CONTROLLER")
		);
	}
};

const sendMoodRatings = async (req, res) => {
	try {
		const db = await dbPromise;
		const access_token = req.query.access_token;
		const decodedToken = verifyToken(
			access_token,
			process.env.JWT_ACCESS_SECRET
		);
		const userId = decodedToken.userId;
		
		const loggedMoods = await db.all(`SELECT * FROM mood_ratings WHERE user_id = ? ORDER BY createdAt`, [userId]);
		

		
		res.status(200).json({
			msg: "SUCCESS",
			moodRatings: loggedMoods,
		});
	} catch (error) {
		res.status(500).json(
			new ApiError(500, "ERROR IN SENDING MOOD RATINGS CONTROLLER")
		);
	}
};

export {
	editJournalController,
	moodTrackerController,
	viewJournalsController,
	sendMoodRatings,
};
