import { useNavigate, useParams } from "react-router-dom";

const ClientProfile = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const handleClickJournals = () => {
		console.log("Navigate to journal show for user : ", id);
		navigate(`/view-journal/${id}`, { replace: false });
	};

	const handleClickMood = () => {
		console.log("Navigate to journal show for user : ", id);
		navigate(`/mood-analysis/${id}`, { replace: false });

	};

	return (
		<>
			<div className="h-40 w-40 mx-auto my-4">
				<button
					className="btn btn-primary text-xl"
					onClick={handleClickJournals}
				>
					See journals
				</button>
				<button
					className="btn btn-primary text-lg my-4"
					onClick={handleClickMood}
				>
					Mood Analysis
				</button>
			</div>
		</>
	);
};

export default ClientProfile;
