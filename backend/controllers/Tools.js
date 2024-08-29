import dbPromise from "../db/db_init.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { verifyToken } from "../utils/handleJWT.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
            VALUES (?, ?, datetime('now', 'localtime))`;

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
            VALUES (?, ?, datetime('now', 'localtime'))`;

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
		console.log("ERROR IN VIEW JOURNALS : ", error);
		res.status(500).json(
			new ApiError(500, "ERROR IN VIEW JOURNALS CONTROLLER")
		);
	}
};

const sendMoodRatings = async (req, res) => {
	try {
		const gemini_api_key = "AIzaSyBJvwQTnVyHjYDawcONyQZhlPiqsJ0JEWA";
		const genAI = new GoogleGenerativeAI(gemini_api_key);
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

		const db = await dbPromise;
		const access_token = req.query.access_token;
		const decodedToken = verifyToken(
			access_token,
			process.env.JWT_ACCESS_SECRET
		);
		const userId = decodedToken.userId;

		const loggedMoods = await db.all(
			`SELECT * FROM mood_ratings WHERE user_id = ? ORDER BY createdAt`,
			[userId]
		);

		let moodAnalysisData = "";

		if (loggedMoods) {
			let prompt = "";
			loggedMoods.forEach((moodObj) => {
				prompt =
					prompt +
					"mood Rating : " +
					moodObj.rating +
					", Date : " +
					moodObj.createdAt +
					"\n";
			});
			prompt =
				prompt +
				". This is my mood ratings on a scale of 1 to 10 where 1 being very bad and 10 being very good. give me a brief analysis of my mood and the common reason of mood changes depending on the timeframe. Generate text in bullet points and don't add any special characters in the text. Also don't ask for any more inputs and make it as validating as possible";
			const result = await model.generateContent(prompt);
			const res = await result.response;
			moodAnalysisData = res.text();
			console.log("Mood analysis : ", moodAnalysisData);
		}

		res.status(200).json({
			msg: "SUCCESS",
			moodRatings: loggedMoods,
			data: moodAnalysisData || "",
		});
	} catch (error) {
		console.log("error in send mood ratings ", error);
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
