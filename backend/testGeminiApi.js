import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const gemini_api_key = "AIzaSyBJvwQTnVyHjYDawcONyQZhlPiqsJ0JEWA";

const genAI = new GoogleGenerativeAI(gemini_api_key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const moods = [
	{
		id: 1,
		user_id: 1,
		rating: 5,
		createdAt: "2024-07-15 03:18:30",
	},
	{
		id: 2,
		user_id: 1,
		rating: 2,
		createdAt: "2024-07-15 06:18:37",
	},
	{
		id: 3,
		user_id: 1,
		rating: 8,
		createdAt: "2024-07-15 09:18:46",
	},
];

const run = async () => {
	let prompt = "";
	moods.forEach((moodObj) => {
		prompt =
			prompt +
			"mood Rating : " +
			moodObj.rating +
			", Date : " +
			moodObj.createdAt +
			"\n";
	});
	
    prompt = prompt + '. This is my mood ratings on a scale of 1 to 10 where 1 being very bad and 10 being very good. give me a brief analysis of my mood and the common reason of mood changes depending on the timeframe'

	const result = await model.generateContent(prompt);
	const res = await result.response;
	console.log("response from gemini -> ", res);
	console.log(res.text());
};

run();
