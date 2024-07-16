// import { useNavigate, useParams } from "react-router-dom";

// const ClientProfile = () => {
// 	const { id } = useParams();
// 	const navigate = useNavigate();
// 	const handleClickJournals = () => {
// 		console.log("Navigate to journal show for user : ", id);
// 		navigate(`/view-journal/${id}`, { replace: false });
// 	};

// 	const handleClickMood = () => {
// 		console.log("Navigate to journal show for user : ", id);
// 		navigate(`/mood-analysis/${id}`, { replace: false });

// 	};

// 	return (
// 		<>
// 			<div className="h-40 w-40 mx-auto my-4">
// 				<button
// 					className="btn btn-primary text-xl"
// 					onClick={handleClickJournals}
// 				>
// 					See journals
// 				</button>
// 				<button
// 					className="btn btn-primary text-lg my-4"
// 					onClick={handleClickMood}
// 				>
// 					Mood Analysis
// 				</button>
// 			</div>
// 		</>
// 	);
// };

// export default ClientProfile;

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { IoLocation } from "react-icons/io5";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import Settings from "./Settings";
import PassChange from "./PassChange";
import ProfileInfo from "./ProfileInfo";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";



import Friends from "./Friends";

const ClientProfile = () => {
  const { user } = useContext(AuthContext);
  const { username, email } = user;
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const imgUrl = user?.profileImg?.substring(6 + 1);

  
  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      fetch(`http://localhost:3000/users/update-avatar`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "PATCH",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          console.log("File uploaded successfully:", data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };
  //   const image = "../../../../server/public/2023-09-18 11.52.21.jpg";
  return (
    <>
      <div className="grid grid-cols-8">
        <div className="bg-primary text-white col-start-1 col-end-3 p-6">
          <div className="w-100% h-[450px] m-auto static">
            <img
              className="rounded-full w-[330px] h-[330px] m-auto mt-6"
              src={
                imgUrl
                  ? `http://localhost:3000/${imgUrl}`
                  : "https://i.pinimg.com/originals/04/d2/78/04d2780a71ef395e373859caf8411b10.jpg"
              }
              //
              alt=""
            />
            <label className="absolute bottom-[550px] left-[400px] cursor-pointer">
              <MdOutlineSystemUpdateAlt className="text-3xl text-yellow-400" />
              <input
                className="hidden"
                type="file"
                onChange={handleFileChange}
              />
            </label>
            {selectedFile ? (
              <>
                <button className="btn" onClick={handleFileUpload}>
                  save
                </button>
              </>
            ) : (
              <></>
            )}
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
              {email}
            </h3>
            <div className="flex items-center gap-3 text-xl py-2 border rounded-md my-2 p-2">
              <IoLocation className="text-black text-2xl" />
              <h3 className="text-xl">{user?.role}</h3>
            </div>
            <div className="flex items-center gap-5 pt-10">
              <p className="text-xl">Followers (0) </p>
              <p className="text-xl">Following (0)</p>
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
              <ProfileInfo></ProfileInfo>
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab px-20"
              aria-label="Settings"
            />
            <div role="tabpanel" className="tab-content p-10">
              {/* update additional info  */}
              <PassChange></PassChange>
              <Settings></Settings>
            </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab px-20"
            aria-label="Friends"
            defaultChecked />
          <div role="tabpanel" className="tab-content p-10">
            <Friends />
          </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab px-20"
              aria-label="Journal"
            />
            <div role="tabpanel" className="tab-content p-10">
              Journal
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientProfile;
