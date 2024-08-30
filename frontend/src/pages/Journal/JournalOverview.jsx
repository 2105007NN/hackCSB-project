import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
const JournalOverview = () => {
	const { id } = useParams();
	const access_token = JSON.parse(localStorage.getItem("access_token"));

	const [journal, setJournal] = useState([{}]);
	const [journalCount, setJournalCount] = useState(0);

	useEffect(() => {
		console.log("fetch a GET request for journals for userID : ", id);
		fetch(
			`http://localhost:3000/tools/journal-overview?access_token=${access_token}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(
					"response from backend in Journal Overview : ",
					data
				);
				setJournal(data.lastJournal);
				setJournalCount(data.journalCount);
			})
			.catch((error) => {
				console.log("ERROR IN FETCHING JOURNALS : ", error);
			});
	}, []);


	return (
		<div className="w-full h-full flex flex-col">
			<h1 className="text-2xl text-center my-4 text-orange-500 underline underline-offset-4">
				TOTAL JOURNALS : {journalCount}
			</h1>

			<h2 className="text-xl text-purple-300 mt-2">
				Your Last Journal :{" "}
			</h2>
			{journal && (
				<div
					key={journal.id}
					className="journal-entry mx-auto my-4 p-4 border border-gray-600 rounded-lg shadow-lg w-full"
					style={{
						maxHeight: "calc(100vh - 30rem)",
						overflowY: "auto",
					}} // Adjust based on overall height requirements
				>
					<div className="flex justify-between mb-2">
						<p className="text-right text-md text-gray-400 font-medium mb-2">
							{new Date(journal.createdAt).toLocaleString(
								"en-US",
								{
									year: "numeric",
									month: "long",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								}
							)}
						</p>
					</div>

					<div
						dangerouslySetInnerHTML={{ __html: journal.content }}
						className="text-xl"
					/>
				</div>
			)}
            <h3 className="text-lg text-orange-500 underline text-center">CLICK TO SEE ALL JOURNALS</h3>
		</div>
	);
};

export default JournalOverview;
