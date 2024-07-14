/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const TestCard = ({ test }) => {
//   const { title, description } = test;
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="bg-secondary h-24">
        <h2 className="card-title text-white text-2xl">
          {test?.title}
          {/* <div className="badge badge-secondary">NEW</div> */}
        </h2>
      </figure>
      <div className="card-body">
        <p className="text-secondary">
         {test?.description}
        </p>
        <div className="card-actions justify-end">
            <Link to={`/take-test/${test?.id}`}>
                <button className="btn btn-secondary text-xl text-white mt-8">
                    Start test
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
