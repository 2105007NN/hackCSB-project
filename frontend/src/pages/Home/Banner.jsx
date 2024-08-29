import { useNavigate } from "react-router-dom";


const Banner = () => {
  const navigate = useNavigate();
  const getStarted = () => {
    navigate('/auth/login', {replace : true})
  }
  return (
    <div
      className="hero h-[550px]"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1499570023676-b0a761678e07?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8Xzh6Rkh1aFJoeW98fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content grid grid-cols-2 flex-col lg:flex-row-reverse">
        <div>
          <h1 className="text-5xl font-bold">Mental health affects us all.</h1>
          <p className="py-6">
            We are here for you.Your journey to better mental health starts
            here.
          </p>
          <button onClick={getStarted} className="btn btn-primary">Get Started</button>
        </div>
        <div className="col-span-1"></div>
      </div>
    </div>
  );
};

export default Banner;
