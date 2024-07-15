import DashboardCard from "../../components/helperComponents/DashboardCard.jsx";
import { useState, useEffect } from "react";

const Dashboard = () => {
	const [quote, setQuote] = useState(null);

	useEffect(() => {
		fetch("http://localhost:3000/quote")
		.then((response) => response.json())
		.then((res) => setQuote(res.data))
		.catch((error) => console.error("Error fetching the quote of the day:", error));
	}, []);

	return (
		<div>
			{quote && (<div className="flex flex-col items-center bg-gradient-to-r from-primary via-secondary to-accent p-6 m-12 rounded-lg shadow-lg">
				<h1 className="text-5xl text-neutral font-bold mb-4">Quote of the day</h1>
				<p className="text-2xl italic text-base-100 mb-2">"{quote.quote}"</p>
				<p className="text-lg text-base-content">-{quote.name}</p>
			</div>)}

			<div className="flex flex-wrap justify-center gap-4 p-7">
				<div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-2">
					<DashboardCard
						title="Articles"
						description="Explore Articles written by our experts"
						srcImg="https://img.freepik.com/free-vector/online-article-concept-illustration_114360-5193.jpg?size=626&ext=jpg&ga=GA1.1.2119322207.1720886354&semt=sph"
						targetUrl="/articles"
					/>
				</div>

				<div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-2">
					<DashboardCard
						title="Journal"
						description="Keep a track of your personal thoughts"
						srcImg="https://img.freepik.com/free-vector/hand-drawn-flat-creative-girl-illustration_23-2151111989.jpg?ga=GA1.1.2119322207.1720886354"
						targetUrl="/edit-journal"
					/>
				</div>

				<div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-2">
					<DashboardCard
						title="Support"
						description="Get Support from professionals"
						srcImg="https://img.freepik.com/free-vector/online-community-concept-illustration_114360-3406.jpg?size=626&ext=jpg&ga=GA1.1.2119322207.1720886354&semt=sph"
						targetUrl="/support"
					/>
				</div>
				<div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-2">
					<DashboardCard
						title="Forum"
						description="Join the community for peer support"
						srcImg="https://img.freepik.com/free-vector/psychologist-concept-illustration_114360-3805.jpg?size=626&ext=jpg&ga=GA1.1.2119322207.1720886354&semt=sph"
						targetUrl="/forum"
					/>
				</div>
				<div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-2">
					<DashboardCard
						title="Quizzes"
						description="Take mental health quizzes"
						srcImg="https://img.freepik.com/free-vector/online-school-platform-abstract-concept-vector-illustration-homeschooling-covid2019-qarantine-online-education-platform-digital-classes-virtual-courses-lms-school-abstract-metaphor_335657-5850.jpg?ga=GA1.1.2119322207.1720886354&semt=sph"
						targetUrl="/create-quiz"
					/>
				</div>
				<div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-2">
					<DashboardCard
						title="Tools"
						description="Explore Tools for mental health"
						srcImg="https://img.freepik.com/free-vector/mental-health-concept-illustration_114360-893.jpg?size=626&ext=jpg&ga=GA1.1.2119322207.1720886354&semt=sph"
						targetUrl="/tools"
					/>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
