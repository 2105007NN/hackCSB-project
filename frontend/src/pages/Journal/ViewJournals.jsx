import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
const ViewJournals = () => {
	const { id } = useParams();
	const access_token = JSON.parse(localStorage.getItem("access_token"));

	const [journals, setJournals] = useState([{}]);

	useEffect(() => {
		console.log("fetch a GET request for journals for userID : ", id);
		fetch(
			`http://localhost:3000/tools/view-journals?access_token=${access_token}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log("response from backend : ", data);
				setJournals(data.journals);
			})
			.catch((error) => {
				console.log("ERROR IN FETCHING JOURNALS : ", error);
			});
	}, []);

	return (
		<div>
			<h1 className="text-2xl text-center mt-4">YOUR JOURNALS </h1>
			{journals.map((journal, indx) => (
				<div
					key={journal.id}
					className="journal-entry mx-auto 
            my-4 p-4 border border-gray-600 rounded-lg shadow-lg w-2/3"
				>
					<div className="flex justify-between mb-2">
						<h3 className="text-sm text-primary">
							NO : {indx + 1}
						</h3>
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
			))}
		</div>
	);
};

export default ViewJournals;
