import { useEffect } from "react";
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

	if (journals?.length > 0) {
		return (
			<div className="my-4">
				<h1 className="text-xl text-center">YOUR JOURNALS </h1>
				{journals?.map((journal, indx) => (
					<div
						key={journal.id}
						className="journal-entry mx-auto my-1 p-2 border border-gray-600 rounded-lg shadow-lg"
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
							dangerouslySetInnerHTML={{
								__html: journal.content,
							}}
							className="text-xl"
						/>
					</div>
				))}
			</div>
		);
	}

	else{
		return (
			<h3 className="text-center m-4 text-purple-300">NO JOURNAL LOGGED TILL NOW</h3>
		)
	}
};

export default ViewJournals;
