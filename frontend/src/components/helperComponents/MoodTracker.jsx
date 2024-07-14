import React, { useRef } from "react";
import { useState } from "react";

const MoodTracker = () => {
	const [value, setValue] = useState(1);
	const sliderRef = useRef();
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
				access_token : JSON.parse(localStorage.getItem('access_token'))
			}),
		};
		fetch("http://localhost:3000/tools/moodTracker", requestOptions)
			.then((response) => response.json())
			.then(data => {
				console.log('Data : ', data);
			})
			.catch(err => {
				console.log("ERROR IN SENDING mood rating : ", err);
			})
	}

	const getColor = (value) => {
		// value is between 1 and 10
		// map this to a range of 0 to 1
		const ratio = (value - 1) / 9;
		const red = Math.round(200 * (1 - ratio));
		const green = Math.round(200 * ratio);
		return `rgb(${red},${green}, 55)`;
	};

	const sliderColor = getColor(value);

	return (
		<>
			
			<div className="flex flex-col items-center p-6">
				<input
					type="range"
					min="1"
					max="10"
					value={value}
					onChange={handleChange}
					className="w-48 appearance-none h-4 rounded-full"
					style={{ background: sliderColor}}
					ref={sliderRef}
				/>
				<div className="mt-4 font-bold" style={{ color: sliderColor }}>
					Current Mood : {mood}
				</div>
				<button className="btn btn-primary my-4
				" onClick={handleClick}>Track your mood</button>
			</div>
		</>
	);
};

export default MoodTracker;
