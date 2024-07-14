import DashboardCard from "../../components/helperComponents/DashboardCard.jsx";

const Dashboard = () => {
	return (
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
					title="Tools"
					description="Explore Tools for mental health"
					srcImg="https://img.freepik.com/free-vector/mental-health-concept-illustration_114360-893.jpg?size=626&ext=jpg&ga=GA1.1.2119322207.1720886354&semt=sph"
                    targetUrl="/tools"
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
					srcImg='https://img.freepik.com/free-vector/online-school-platform-abstract-concept-vector-illustration-homeschooling-covid2019-qarantine-online-education-platform-digital-classes-virtual-courses-lms-school-abstract-metaphor_335657-5850.jpg?ga=GA1.1.2119322207.1720886354&semt=sph'
                    targetUrl="/create-quiz"
                />
			</div>
			<div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-2">
				<DashboardCard
					title="Journals"
					description="Keep a track of your personal thoughts"
					srcImg="https://img.freepik.com/free-vector/resource-management-concept-illustration_114360-7446.jpg?size=626&ext=jpg&ga=GA1.1.2119322207.1720886354&semt=sph"
                    targetUrl="/resources"
                />
			</div>
		</div>
	);
};

export default Dashboard;
