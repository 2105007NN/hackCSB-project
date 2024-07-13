/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const Register = () => {
	useTitle("Register");
	const { user, setUser } = useContext(AuthContext);
	const [error, setError] = useState("");
	const [errorPass, setErrorPass] = useState("");

	// const [errorFirebase, setErrorFirebase] = useState("");
	// const [errorPassConfirm, setErrorPassConfirm] = useState("");

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const username = form.name.value;
		const email = form.email.value;
		const password = form.password.value;
    const role = form.role.value;
		console.log("Data entered in registration form : ");
		console.log(username, email, password, role);

		if (!username || !email || !password) {
			setError("Can't leave any fields empty");
			return;
		}

		fetch(`http://localhost:3000/auth/create-${role}`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ username, email, password }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setUser(data.data.newUser);
				localStorage.setItem("user", JSON.stringify(data.data.newUser));
				localStorage.setItem(
					"access_token",
					JSON.stringify(data.data.accessToken)
				);
			});
		navigate(from, { replace: true });
	};
	//password setting
	const handlePassword = (event) => {
		if (!/(?=.{8,})/.test(event.target.value)) {
			setErrorPass("password must be 8 characters");
			return;
		}
		if (!/(?=.*[a-zA-Z])/.test(event.target.value)) {
			setErrorPass("password must have a Uppercase letter");
			return;
		}
		if (!/(?=.*[!#$%&?@*^ "])/.test(event.target.value)) {
			setErrorPass("password must have atleast one special character");
			return;
		}
		setErrorPass("");
		// setPassword(event.target.value);
	};

	return (
		<div>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content grid grid-cols-2 gap-[100px] lg:flex-row-reverse">
					<div className="text-center lg:text-left ">
						<img
							className="w-[400px] shadow-2xl rounded-2xl"
							src=""
							alt=""
						/>
					</div>
					<div
						onSubmit={handleSubmit}
						className="card flex-shrink-0 shadow-2xl bg-base-100 w-[550px]"
					>
						<form className="card-body w-[540px] justify-center">
							<h1 className="text-4xl font-bold">
								Create an account
							</h1>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Username</span>
								</label>
								<input
									type="text"
									name="name"
									placeholder="name"
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								{/* email, firstname, lastname, password, date_of_birth, mobile, city, country */}
								<input
									type="email"
									name="email"
									placeholder="abcd@gmail.com"
									className="input input-bordered"
								/>
							</div>

							{/* 
                      role 
              */}
							<div className="form-control">
								<label className="label">
									<span className="label-text">Role</span>
								</label>
								<select
									name="role"
									className="input input-bordered"
                  aria-placeholder="choose your role"
								>
									<option value="client">Client</option>
									<option value="therapist">Therapist</option>
								</select>
							</div>

							{/* 
                            password  
                  */}
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input
									onChange={handlePassword}
									type="password"
									name="password"
									placeholder="password"
									className="input input-bordered"
								/>

								<label className="label">
									<p className="label-text-alt">
										Already have an account?
									</p>
									<Link
										to="/auth/login"
										className="label-text-alt link link-hover"
									>
										Login
									</Link>
								</label>
							</div>
							{/* <div className="form-control">
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input onChange={handlePassword} type="password" name='password' placeholder="confirm password" className="input input-bordered" />
                    </div> */}
							{/* <label className="label">
                        <p className='label-text-alt'>Already have an account?</p><Link to='/login' className="label-text-alt link link-hover">Login</Link>
                    </label> */}

							<p className="text-rose-600 font">{error}</p>
							<div className="form-control mt-6">
								<button
									type="submit"
									className="btn btn-primary"
								>
									REGISTER
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
