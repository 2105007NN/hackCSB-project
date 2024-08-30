import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PostPopup from "./PostPopup";



const AskShare = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => {
    setIsVisible(!isVisible)
  }
  return (
        <div className="flex items-center p-2 ml-32 mt-2 w-1/3 rounded-full border-zinc-950 bg-gray-100 h-9 absolute left-96 top-36">
          <div className="w-8 h-8 bg-black rounded-full flex-col items-center justify-center">
            <span className="text-white text-lg">👤</span>
          </div>
          <input
            type="text"
            placeholder="What do you want to ask or share?"
            className="flex-1 ml-2 p-2 bg-gray-100 outline-none rounded-full"
            onClick={toggle}
          />
          <PostPopup
            isVisible={isVisible}
            onClose={toggle}
          >
          </PostPopup>
        </div>
  );
};

export default AskShare;
