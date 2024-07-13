const TestCard = () => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="bg-primary h-24">
        <h2 className="card-title text-white text-2xl">
            ADHD
          {/* <div className="badge badge-secondary">NEW</div> */}
        </h2>
      </figure>
      <div className="card-body">
        <p className="text-primary">Find out if youre experiencing the most common symptoms of ADHD.</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary text-xl text-white mt-8">Start test</button>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
