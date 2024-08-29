import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Chart } from "react-google-charts";
const MoodAnalysis = () => {
	const { id } = useParams();
	const access_token = JSON.parse(localStorage.getItem("access_token"));

	const [moodRatings, setMoodRatings] = useState([{}]);
	const [moodAnalysis, setMoodAnalysis] = useState("");
	const [textArray, setTextArray] = useState([]);

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

	console.log(labels);

	const data = moodRatings?.map((entry) => entry.rating);

	useEffect(() => {
		console.log("fetch a GET request for mood ratings for userID : ", id);
		fetch(
			`http://localhost:3000/tools/mood-ratings?access_token=${access_token}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log("response from backend : ", data);
				setMoodRatings(data.moodRatings);
				setMoodAnalysis(data.data);
				const texts = data.data
					.split("*")
					.filter((item) => item.trim() !== "");
				setTextArray(texts);
			})
			.catch((error) => {
				console.log("ERROR IN FETCHING JOURNALS : ", error);
			});

		console.log(moodAnalysis);
	}, []);

	if (moodRatings?.length > 0) {
		return (
		  <>
			<div className="flex flex-col items-center">
			  <h1 className="text-2xl text-center">Mood Rating Chart</h1>
			  <Chart
    chartType="LineChart"
    width={"80%"}
    height={"60vh"}
    data={[
      ["Time", "Mood Rating"],
      ...data.map((rating, index) => [labels[index], rating]),
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
        viewWindow: {
          min: 1,  // Minimum value of y-axis
          max: 10, // Maximum value of y-axis
        },
        ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Customize tick marks
      },
      titleTextStyle: { color: "#F2F2F2" }, // Light text color for title
    }}
  />
	
			  <h2 className="text-purple-300 underline underline-offset-8 mb-4">
				MOOD ANALYSIS
			  </h2>
	
			  <ol className="bg-purple-900 text-white p-4 rounded-lg shadow-md m-4">
				{textArray.map((item, index) => (
				  <li
					key={index}
					className="m-2 p-2 rounded-lg text-lg font-semibold"
				  >
					{item.trim()}
				  </li>
				))}
			  </ol>
			</div>
		  </>
		);
	  } else {
		return (
		  <h3 className="text-center m-4 text-purple-300">
			NOT ENOUGH MOOD RATINGS AVAILABLE
		  </h3>
		);
	  }
	};

export default MoodAnalysis;
