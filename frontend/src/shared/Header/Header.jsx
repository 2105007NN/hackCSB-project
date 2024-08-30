import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const imgUrl = user?.profileImg?.substring(6 + 1);
  console.log(user?.role);
  //logout user
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
  };
  return (
    <>
      <nav className="bg-blue-950 border-gray-200 dark:bg-gray-900 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" class="flex items-center space-x-2 rtl:space-x-reverse">
            <img
              src="/public/png-clipart-avatar-youtube-cat-cute-dog-heroes-cat-like-mammal-removebg-preview.png"
              className="h-8"
              alt="App Logo"
            />
            <span className="self-center text-base-200  text-2xl font-semibold whitespace-nowrap dark:text-white">
              HelpUrSelf
            </span>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div
              type="button"
              className="flex text-sm text-white rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 pl-1 pr-3"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              {/* if user is logged in, show UI according to the role */}
              {user?.id ? (
                <>
                  <div className="dropdown dropdown-end">
                    <div className="flex flex-row-reverse items-center">
                      <h2>{user?.username}</h2>
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 rounded-full">
                             <img src={imgUrl ? `http://localhost:3000/${imgUrl}` : "https://png.pngtree.com/png-vector/20210702/ourmid/pngtree-black-chess-pawn-png-image_3539520.jpg"} />
                        </div>
                      </label>
                    </div>
                    <ul
                      tabIndex={0}
                      className="mt-3 p-2 text-white shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52 z-10"
                    >
                      <li>
                        {user?.role === "client" ? (
                          <Link to={`/client/profile/${user?.id}`}>
                            Profile
                          </Link>
                        ) : (
                          <Link to={`/therapist/profile/${user?.id}`}>
                            Therapist Profile
                          </Link>
                        )}
                      </li>
                      <li>
                        {user?.role === "admin" ? (
                          <Link to="/admin/dashboard">Admin </Link>
                        ) : user?.role === "client" ? (
                          <Link to="/client/dashboard">Dashboard</Link>
                        ) : (
                          <Link to="/therapist/dashboard">Therapist Dashboard</Link>
                        )}
                        {/* <Link to='/mycourses' className="justify-between">
                    Dashboard
                    <span className="badge">New</span>
                </Link> */}
                      </li>
                      <li>
                        <Link onClick={handleLogout} to="/auth/login">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
              ) : 
              
              // if user is not logged in, show login page

              (
                <>
                  <div>
                    <Link to="/auth/login">
                      <button
                        type="button"
                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-orange-600 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Login
                      </button>
                    </Link>
                  </div>

                  <div>
                    <Link to="/auth/register">
                      <button
                        type="button"
                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-orange-600 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Register
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 "
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li className="block py-2 px-3 text-base-100  rounded hover:bg-orange-600 md:hover:bg-transparent md:hover:text-orange-600 md:p-0 dark:text-white md:dark:hover:text-primary dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                {user?.role === "client" ? (
                  <Link to="/client/dashboard"> Dashboard</Link>
                ) : (
                  <> </>
                )}
                {user?.role === "therapist" ? (
                  <Link to="/therapist/dashboard"> Expert Dashboard</Link>
                ) : (
                  <> </>
                )}
              </li>

              {user ? (
                  <></>
                ) : (
                  <Link
                  to="/"
                  class="block py-2 px-3 text-base-100  rounded hover:text-orange-600 md:p-0 dark:text-white md:dark:hover:text-primary dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </Link>
                )}
              <li>
                <Link
                  to="/support"
                  class="block py-2 px-3 text-base-100  rounded hover:text-orange-600 md:p-0 dark:text-white md:dark:hover:text-primary dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  to="/tests"
                  class="block py-2 px-3 text-base-100  rounded hover:bg-orange-600md:hover:bg-transparent md:hover:text-orange-600 md:p-0 dark:text-white md:dark:hover:text-primary dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Online Tests
                </Link>
              </li>
              <li>
                <Link
                  to="/articles"
                  class="block py-2 px-3 text-base-100  rounded hover:text-orange-600 md:p-0 dark:text-white md:dark:hover:text-primary dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Articles
                </Link>
              </li>
              
              {/* <li>
                <Link to="/login" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
