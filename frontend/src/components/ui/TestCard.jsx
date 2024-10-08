/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

// eslint-disable-next-line react/prop-types
const TestCard = ({ test }) => {
//   const { title, description } = test;
    const {user} = useContext(AuthContext);
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure className="bg-primary h-24">
        <h2 className="card-title text-white text-2xl">
          {test?.title}
        </h2>
      </figure>
      <div className="card-body">
        <p className="text-info">
         {test?.description}
        </p>
        <div className="card-actions justify-start">
            {
            user?.id ? <Link to={`/take-test/${test?.id}`}>
            <button className="btn btn-primary text-xl text-white mt-8">
                Start test
            </button>
        </Link> :
          <Link to={`/auth/login`}>
          <button className="btn btn-primary text-xl text-white mt-8">
              Start test
          </button>
      </Link> 
          }
        </div>
      </div>
    </div>
  );
};

export default TestCard;
