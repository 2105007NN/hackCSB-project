import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { IoLocation } from "react-icons/io5";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import ProfileInfo from "./ProfileInfo";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import potat from '../../assets/potat.jpg'


const OtherUserProfile = () => {
  const {username} = useParams()
  const [user, setUser] = useState(null)
  const [categories, setCategories] = useState([])
  const imgUrl = user?.profileImg?.substring(6 + 1);

  useEffect(() => {
    fetch("http://localhost:3000/users/other/" + username)
    .then(res => res.json())
    .then(res => {
        console.log(res.data);
        setUser(res.data.user_info)
        setCategories(res.data.category_info)
    })
  }, [])
  
  
  return (
    <>
      <div className="grid grid-cols-8">
        <div className="text-white col-start-1 col-end-3 p-6 bg-gradient-to-r from-accent via-secondary">
          <div className="w-100% h-[450px] m-auto static">
          <div className="static">
          <img
              className="rounded-full border-2 w-[330px] h-[330px] m-auto mt-6"
              src={imgUrl ? `http://localhost:3000/${imgUrl}` : potat}
              //
              alt=""
            />
            
          </div>
          </div>
          <div className="p-5 border rounded-xl">
            <h2 className="flex items-center gap-3 text-2xl border rounded-md p-2 my-1">
              <FaUserCircle className="text-black" />
              {username}
            </h2>
            <h3 className="flex items-center gap-3 text-xl py-2 border rounded-md p-2 ">
              <span className="text-black">
                <MdEmail />
              </span>
              {user?.createdAt}
            </h3>
            <div className="flex items-center gap-3 text-xl py-2 border rounded-md my-2 p-2">
              <IoLocation className="text-black text-2xl" />
              <h3 className="text-xl">{user?.role}</h3>
            </div>
          </div>
        </div>

        <div className=" shadow-lg col-start-3 col-end-9 p-5 m-5 border rounded-xl">
          {/* tabs  */}
          <div role="tablist" className="tabs tabs-bordered">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab px-20"
              aria-label="Info"
            />
            <div role="tabpanel" className="tab-content p-10">
                <section className="border p-4 rounded-sm">
                    <h2 className="text-lg bg-gradient-to-r from-primary to-secondary p-1 text-white">Profile</h2>
                    <div className="grid grid-cols-2 text-xl">
                    <div className="font-light text-sm p-4">First Name 
                            <p className="text-white font-sm text-lg">{user?.firstname ? user.firstname : ""}</p>
                        </div>
                        <div className="font-light text-sm p-4">Last Name 
                            <p className="text-white font-sm text-lg">{user?.lastname ? user.lastname : ""}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 my-5">
                        <div className="font-light text-sm p-4">Gender 
                            <p className="text-white font-sm text-lg">{user?.gender}</p>
                        </div>
                        <div className="font-light text-sm p-4">Age group 
                            <p className="text-white font-sm text-lg">{user?.ageGroup ? user.ageGroup : ""}</p>
                        </div>
                    </div>
                </section>
            </div>
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab px-20"
              aria-label="Category"
            />
            <div role="tabpanel" className="tab-content p-10">
                <section className="max-w-screen-2xl p-5 border rounded-lg mx-auto grid grid-cols-3 gap-4">
                    <div className="flex pb-3 flex-wrap">
                        {categories.map((category, index) => (
                        <span
                            key={index}
                            className={`bg-${category.color}-100 text-${category.color}-800 text-lg font-semibold me-2 px-4 py-1 rounded-lg dark:bg-gray-700 dark:text-${category.color}-400 border border-${category.color}-400`}
                        >
                            {category.category_name}
                        </span>
                        ))}
                    </div>
                </section>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default OtherUserProfile;
