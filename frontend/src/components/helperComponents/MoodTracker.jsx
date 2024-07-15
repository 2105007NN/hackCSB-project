import React, { useRef } from "react";
import { useState } from "react";

const MoodTracker = () => {
	const [value, setValue] = useState(1);
	const sliderRef = useRef();
	const [isMoodRated, setIsMoodRated] = useState(false);
	let mood;

	if (value <= 2) {
		mood = "Very Bad 🤬";
	} else if (value > 2 && value <= 4) {
		mood = "Bad 😡";
	} else if (value > 4 && value <= 6) {
		mood = "Meh 😒";
	} else if (value > 6 && value <= 8) {
		mood = "Good 😊";
	} else {
		mood = "Very good 😚";
	}

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const handleClick = () => {
		console.log(sliderRef.current.value);
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				moodRating: sliderRef.current.value,
				access_token: JSON.parse(localStorage.getItem("access_token")),
			}),
		};
		fetch("http://localhost:3000/tools/moodTracker", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log("Data : ", data);
				setIsMoodRated(true);
			})
			.catch((err) => {
				console.log("ERROR IN SENDING mood rating : ", err);
			});
	};

	const getColor = (value) => {
		// value is between 1 and 10
		// map this to a range of 0 to 1
		const ratio = (value - 1) / 9;
		const red = Math.round(200 * (1 - ratio));
		const green = Math.round(200 * ratio);
		return `rgb(${red},${green}, 55)`;
	};

	const sliderColor = getColor(value);

	if (!isMoodRated) {
		return (
			<>
				<h3
					className="
                    text-lg mb-4"
				>
					HOW ARE YOU FEELING TODAY?
				</h3>
				<div className="flex flex-col items-center p-6">
					<input
						type="range"
						min="1"
						max="10"
						value={value}
						onChange={handleChange}
						className="w-48 appearance-none h-4 rounded-full"
						style={{ background: sliderColor }}
						ref={sliderRef}
					/>
					<div
						className="mt-4 font-bold"
						style={{ color: sliderColor }}
					>
						Current Mood : {mood}
					</div>
					<button
						className="btn btn-primary my-4
					"
						onClick={handleClick}
					>
						Track your mood
					</button>
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className="w-1/2 h-full mb-8">
					<h1 className="text-2xl text-purple-300 text-center">
						Your mood has been recorded
					</h1>

					<br />
					<br />

					<h2 className="text-secondary text-2xl text-center text-wrap">
						Thank you for being you
					</h2>
				</div>
			</>
		);
	}
};

export default MoodTracker;
