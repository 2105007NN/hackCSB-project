import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Chart } from "react-google-charts";
const MoodAnalysisMini = (props) => {
	console.log("props in mood analysis mini : ", props);
	const id = props.id;
	const access_token = JSON.parse(localStorage.getItem("access_token"));

	const [moodRatings, setMoodRatings] = useState([{}]);
	const [moodAnalysis, setMoodAnalysis] = useState("");

	const [loading, setLoading] = useState(true);

	// Extract labels (formatted date) and data (ratings)
	const labels = moodRatings?.map((entry) => {
		const date = new Date(entry.createdAt);
		const formattedDate = date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "2-digit",
		});
		const formattedTime = date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
		return `${formattedDate} ${formattedTime}`;
	});

	const data = moodRatings?.map((entry) => entry.rating);

	useEffect(() => {
		console.log("fetch a GET request for mood ratings for userID : ", id);
		fetch(
			`http://localhost:3000/tools/mood-ratings?access_token=${access_token}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log("response from backend for mood analysis : ", data);
				setMoodRatings(data.moodRatings);
				setMoodAnalysis(data.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log("ERROR IN FETCHING JOURNALS : ", error);
				setLoading(false);
			});
	}, []);

	if (moodRatings?.length > 0) {
		return (
			<div className="flex flex-col items-center">
				<h1 className="text-2xl text-center">Mood Rating Chart</h1>

				{loading ? (
					<div className="flex items-center justify-center h-40vh">
						<div className="text-xl text-white">Loading...</div>
					</div>
				) : (
					<Chart
						chartType="LineChart"
						width={"100%"}
						height={"40vh"}
						data={[
							["Time", "Mood Rating"],
							...data.map((rating, index) => [
								labels[index],
								parseInt(rating),
							]),
						]}
						options={{
							title: "Mood Ratings Over Time",
							legend: {
								position: "bottom",
								textStyle: { color: "white", fontSize: 16 },
							},
							backgroundColor: "#292C37", // Dark gray background
							series: {
								0: { pointRadius: 50 }, // Show points on the line
							},
							hAxis: {
								textStyle: { color: "#F2F2F2" }, // Light text color for labels
							},
							vAxis: {
								textStyle: { color: "#F2F2F2" }, // Light text color for labels
							},
							titleTextStyle: { color: "#F2F2F2" }, // Light text color for title
						}}
					/>
				)}

				<h2 className="text-purple-300 underline underline-offset-8 mb-4">
					CLICK TO SEE MOOD ANALYSIS IN DETAILS
				</h2>
			</div>
		);
	} else {
		return (
			<h3 className="text-center m-4 text-purple-300">
				NOT ENOUGH MOOD RATINGS AVAILABLE
			</h3>
		);
	}
};

export default MoodAnalysisMini;
