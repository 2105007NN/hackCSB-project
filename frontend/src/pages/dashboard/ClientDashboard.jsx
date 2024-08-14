import { useQuery } from "@tanstack/react-query";
import DashboardCard from "../../components/helperComponents/DashboardCard.jsx";
import { useState, useEffect } from "react";
import Loading from "../../components/ui/Loading.jsx";

const Dashboard = () => {
	const [quote, setQuote] = useState(null);

	useEffect(() => {
		fetch("http://localhost:3000/quote")
		.then((response) => response.json())
		.then((res) => setQuote(res.data))
		.catch((error) => console.error("Error fetching the quote of the day:", error));
	}, []);

	const { data: scores, isLoading } = useQuery({
        queryKey: ['scores'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:3000/categories/user-category/single', {
                    headers: {
                        // 'content-type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                return data.data; // assuming the data is in the 'data' property
            } catch (error) {
                console.log(error);
                return [];
            }
        }
    });
	console.log(scores);
    if (isLoading) {
        return <Loading />;
    }

	return (
		<div className="max-w-screen-2xl m-auto">
			{quote && (<div className="flex flex-col items-center bg-gradient-to-r from-primary via-secondary to-accent p-6 m-12 rounded-lg shadow-lg">
				<h1 className="text-5xl text-neutral font-bold mb-4">Quote of the day</h1>
				<p className="text-2xl italic text-base-100 mb-2">{`"${quote.quote}"`}</p>
				<p className="text-lg text-base-content">-{quote.name}</p>
			</div>)}

			<section className="max-w-screen-2xl p-5 border rounded-lg mx-auto">
                <h2 className="text-lg ">Category-wise Stats</h2>
                <div>
                    {scores.map((score) => (
                        <div key={score.id}>
                            <p>Category: {score.category_name}</p>
                            <p>Score: {score.score}</p>
                        </div>
                    ))}
                </div>
            </section>


			<div className="grid grid-cols-3 justify-center gap-10 m-auto py-20">
				<div className="mx-auto">
					<DashboardCard
						title="Articles"
						description="Explore Articles written by our experts"
						srcImg="https://img.freepik.com/free-vector/online-article-concept-illustration_114360-5193.jpg?size=626&ext=jpg&ga=GA1.1.2119322207.1720886354&semt=sph"
						targetUrl="/articles"
					/>
				</div>

				<div className="mx-auto">
					<DashboardCard
						title="Journal"
						description="Keep a track of your personal thoughts"
						srcImg="https://img.freepik.com/free-vector/hand-drawn-flat-creative-girl-illustration_23-2151111989.jpg?ga=GA1.1.2119322207.1720886354"
						targetUrl="/edit-journal"
					/>
				</div>

				<div className="mx-auto">
					<DashboardCard
						title="Support"
						description="Get Support from professionals"
						srcImg="https://img.freepik.com/free-vector/online-community-concept-illustration_114360-3406.jpg?size=626&ext=jpg&ga=GA1.1.2119322207.1720886354&semt=sph"
						targetUrl="/support"
					/>
				</div>
				<div className="mx-auto">
					<DashboardCard
						title="Forum"
						description="Join the community for peer support"
						srcImg="https://img.freepik.com/free-vector/psychologist-concept-illustration_114360-3805.jpg?size=626&ext=jpg&ga=GA1.1.2119322207.1720886354&semt=sph"
						targetUrl="/forum"
					/>
				</div>
				<div className="mx-auto">
					<DashboardCard
						title="Quizzes"
						description="Take mental health quizzes"
						srcImg="https://img.freepik.com/free-vector/online-school-platform-abstract-concept-vector-illustration-homeschooling-covid2019-qarantine-online-education-platform-digital-classes-virtual-courses-lms-school-abstract-metaphor_335657-5850.jpg?ga=GA1.1.2119322207.1720886354&semt=sph"
						targetUrl="/create-quiz"
					/>
				</div>
				<div className="mx-auto">
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
