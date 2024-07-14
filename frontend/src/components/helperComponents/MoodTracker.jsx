import React from "react";
import { useState } from "react";

const MoodTracker = () => {
	const [value, setValue] = useState(1);
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
					className="w-1/2 appearance-none h-2 rounded-full"
					style={{ background: sliderColor }}
				/>
				<div className="mt-4 font-bold" style={{ color: sliderColor }}>
					Current Mood : {mood}
				</div>
			</div>
		</>
	);
};

export default MoodTracker;
