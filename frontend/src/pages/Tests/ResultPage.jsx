import { useLoaderData } from "react-router-dom";

const ResultPage = () => {
    const data = useLoaderData();
    const results = data.data;
    const score = results[0].score;
    console.log(results);
    // const {data: bookings =[]} = useQuery({
    //     queryKey:['bookings', user?.email],
    //     queryFn: async ()=>{
    //         const res = await fetch(url,{
    //             headers:{
    //                 authorization: `bearer ${localStorage.getItem('accessToken')}`
    //             }
    //         });
    //         const data = await res.json();
    //         console.log(data)
    //         console.log(localStorage.getItem('accessToken'));
    //         return data;
    //     }
    // })


    return (
        <div>
            <section className="py-28 bg-info text-center text-white m-auto">
                <h3 className="text-5xl text-white font-semibold text-center text-accent">ADHD Test Results</h3>
                <h4 className="text-xl max-w-2xl mx-auto mt-4">The questions are based on an evidence-based screening tool but are indicative only and do not form a formal diagnosis</h4>
            </section>
            {/* result section  */}
            <section className="py-28 text-center text-white m-auto max-w-screen-xl">
                <h3 className="text-2xl font-medium text-error p-5">Your results are highly consistent with ADHD</h3>
                <progress className="progress progress-info w-full" value={score} max="100"></progress>
                <div className="grid grid-cols-3 text-xl text-accent p-5">
                    <div>
                        low (0-30)
                    </div>
                    <div>
                        medium (30-70)
                    </div>
                    <div>high (70-100)</div>
                </div>
            </section>

            {/* review answer section  */}
            <section className="py-28 text-center text-white m-auto max-w-screen-xl">
            <div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" defaultChecked />
  <div className="collapse-title text-xl text-error hover:underline">Review my answers</div>
    <div className="collapse-content">
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Question</th>
                        <th>Answer</th>
                    </tr>
                    </thead>
                    <tbody>
                                {
                                    results.map((result, index) => (
                                        <tr key={result.id}>
                                            <th>{ index + 1 }</th>
                                            <td>{result?.question}</td>
                                            <td>{result?.user_answer}</td>
                                        </tr>
                                    ))
                                }
                    </tbody>
                </table>
            </div>
    </div>
</div>


                {/* <h3 className="text-xl text-error hover:underline">Review my answers</h3> */}


                {/* <div className="overflow-x-auto"> */}
  {/* <table className="table table-zebra">
    {/* head */}
    {/* <thead>
      <tr>
        <th></th>
        <th>Question</th>
        <th>Answer</th>
      </tr>
    </thead>
    <tbody>
                {
                    results.map((result, index) => (
                        <tr key={result.id}>
                            <th>{ index + 1 }</th>
                            <td>{result?.question}</td>
                            <td>{result?.user_answer}</td>
                        </tr>
                    )) */}
                {/* } */} 
    {/* </tbody>
  </table>
</div>
 */}

            </section>
        </div>
    );
};

export default ResultPage;