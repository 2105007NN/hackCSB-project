import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

import potat from "../../assets/potat.jpg"
import chat from '../../assets/chat.png'

const SimilarUsers = ({currentUser, joinChat}) => {
    const { user, setUser } = useContext(AuthContext);
    const [similarUsers, setSimilarUsers] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/similar/user/${user.username}`)
        .then(res => res.json())
        .then(res => {
            console.log("Similar users list received:\n", res);
            setSimilarUsers(res.data)
        })
    }, [])    

    return (
        <div className="h-[680px] overflow-y-auto overflow-x-hidden bg-neutral">
          <h2 className='m-2 p-4 font-bold bg-gradient-to-r from-primary via-secondary to-accent text-[25px] text-neutral rounded-lg'>Users with similar issues:</h2>
          {similarUsers.map((user) => {
            
              return (
                <div className="m-2 pl-4 bg-base-100 border border-info rounded-lg">
                    <div className="flex items-center justify-between rounded-lg">
                        <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full ring-2 ring-neutral" src={potat} alt="Rounded avatar" />
                        <p key={user.id} className="p-2 m-4 font-medium text-[20px]">
                            {user.username}
                        </p>
                        </div>
                        <button className="btn btn-primary ml-auto mr-3" title="Connect" onClick={() => joinChat(user)} alt="Chat" >
                        <img src={chat} className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex pb-3 flex-wrap">
                        {user.categories.map((category, index) => (
                        <span
                            key={index}
                            className={`bg-${category.color}-100 text-${category.color}-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-${category.color}-400 border border-${category.color}-400`}
                        >
                            {category.category_name}
                        </span>
                        ))}
                    </div>
                </div>

              );
            
          })}
        </div>
    )
}

export default SimilarUsers;