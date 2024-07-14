import React from "react";
import { useState } from "react";
import MoodTracker from "../../components/helperComponents/MoodTracker";
import TextEditor from "../../components/helperComponents/TextEditor";
const Tools = () => {
	return (
		<>
			<h1
				className="text-white
            text-center
            text-3xl"
			>
				THIS IS TOOLS PAGE
			</h1>

			<div className="flex flex-wrap w-full 
            h-full m-8 gap-4">
				<div className="w-2/3 flex flex-col items-center
                justify-center">
                    <h2 className="text-primary mb-3 text-xl underline">YOUR PERSONAL JOURNAL</h2>
					<TextEditor />
				</div>
				<div className="w-1/4 flex flex-col 
                items-center justify-center">
                    <h3 className="
                    text-lg mb-4">HOW ARE YOU FEELING TODAY</h3>
					<MoodTracker />
				</div>
			</div>
		</>
	);
};

export default Tools;
