import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const MoodAnalysis = () => {

    const {id} = useParams();
    const access_token = JSON.parse(localStorage.getItem("access_token"));

    const[moodRatings, setMoodRatings] = useState([{}]);

    useEffect(() => {
		console.log("fetch a GET request for mood ratings for userID : ", id);
		fetch(
			`http://localhost:3000/tools/mood-ratings?access_token=${access_token}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log("response from backend : ", data);
				setMoodRatings(data.moodRatings);
			})
			.catch((error) => {
				console.log("ERROR IN FETCHING JOURNALS : ", error);
			});
	}, []);

	return (
		<>
			<h1 className="text-2xl text-center">Mood analysis PAGE</h1>
            
		</>
	);
};

export default MoodAnalysis;
