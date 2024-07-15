import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero h-96 mb-8"
      style={{
        backgroundImage:
          "url(https://plus.unsplash.com/premium_photo-1667762241847-37471e8c8bc0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGVhbHRofGVufDB8fDB8fHww)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-4xl">
          <h1 className="mb-5 text-5xl font-bold">
            Change can start with a single step
          </h1>
          <p className="mb-5">
            Our online mental health tests can help make sense of your feelings
            and could be the first step towards getting the right help. Prof
            Uttom Chowdhury - MB ChB, MRC Psych - Consultant Child & Adolescent
            Psychiatrist
          </p>
          {/* <button className="btn btn-primary text-xl"><a href="#tests">Take Tests</a></button> */}
            <Link to={`/take-test/7`}>
                <button className="btn btn-primary text-xl text-white mt-8">
                    Take Test
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
