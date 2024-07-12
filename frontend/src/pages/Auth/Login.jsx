/* eslint-disable no-unused-vars */
// import { useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { AuthContext } from "../../context/AuthProvider";
// import useTitle from "../../hooks/useTitle";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  useTitle("Login");
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // .state?.from?
  const from = location.state?.from?.pathname || "/";
  //   const notify = () => toast("Login successful");

  const handleSubmit = (event) => {
    console.log("hello");
    event.preventDefault();
    const form = event.target;
    const password = form.password.value;
    const email = form.email.value;
    console.log(email, password);
    console.log("before login");
    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data.data.user);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        localStorage.setItem("access_token", JSON.stringify(data.data.accessToken));
        // console.log("dafdf");
        // notify();
      });
    // Navigate()
    navigate(from, { replace: true });
  };

  // console.log(user.username);

  return (
    <div className="hero min-h-screen ">
      {/* <ToastContainer /> */}
      <div className="hero-content grid grid-cols-1 md:grid-cols-2 gap-[100px] lg:flex-row-reverse">
        <div className="text-center lg:text-left ">
          {/* <img className='w-[400px] shadow-2xl rounded-2xl' src="https://www.pngitem.com/pimgs/m/48-488412_transparent-game-piece-png-chess-pawn-png-png.png" alt="" /> */}
        </div>
        <div className="card flex-shrink-0 w-[550px] bg-base-200">
          <form onSubmit={handleSubmit} className="card-body w-[540px]">
            <h1 className="text-4xl font-bold">Login now!</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
                <Link
                  to="/auth/register"
                  className="label-text-alt link link-hover"
                > Dont have an account? Register
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
