const ResultPage = () => {
    return (
        <div>
            <section className="py-28 bg-info text-center text-white m-auto">
                <h3 className="text-5xl text-white font-semibold text-center ">ADHD Test Results</h3>
                <h4 className="text-xl max-w-2xl mx-auto mt-4">The questions are based on an evidence-based screening tool but are indicative only and do not form a formal diagnosis</h4>
            </section>
            {/* result section  */}
            <section className="py-28 text-center text-white m-auto max-w-screen-xl">
                <h3 className="text-2xl font-medium text-error">Your results are highly consistent with ADHD</h3>
                <progress className="progress progress-info w-full" value={0} max="100"></progress>
            </section>

            {/* review answer section  */}
            <section className="py-28 text-center text-white m-auto max-w-screen-xl">
                <h3 className="text-xl text-error hover:underline">Review my answers</h3>
                <div>
                    
                </div>
            </section>
        </div>
    );
};

export default ResultPage;