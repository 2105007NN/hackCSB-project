import React from "react";
import { useState } from "react";
import MoodTracker from "../../components/helperComponents/MoodTracker";
import TextEditor from "../../components/helperComponents/TextEditor";
const Journal = () => {
	return (
		<>
			<h1
				className="
            text-center underline underline-offset-8
            text-3xl text-primary m-4"
			>
				YOUR PERSONAL JOURNAL
			</h1>

			<div className="flex flex-wrap w-full 
            h-full m-8 gap-4">
				<div className="w-2/3 flex flex-col items-center
                justify-center">
                    {/* <h2 className="text-primary mb-3 text-xl underline">YOUR PERSONAL JOURNAL</h2> */}
					<TextEditor />
				</div>
				<div className="w-1/4 flex flex-col items-center justify-center 
                border border-gray-800 shadow-lg p-4 rounded-lg">
                    
					<MoodTracker />
				</div>
			</div>
		</>
	);
};

export default Journal;
