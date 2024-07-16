import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import potat from '../../assets/potat.jpg'

export default function Friends () {
    const { user, setUser } = useContext(AuthContext);
    const [friendList, setFriendList] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/connected/users/" + user.username)
        .then(res => res.json())
        .then(res => {
            setFriendList(res.data)
        })
    }, [])

    return (
        <div>
            {friendList.map((u) => {
                return (
                    <div className="m-2 pl-4 bg-base-100 border border-info rounded-lg">
                        <div className="flex items-center justify-between rounded-lg">
                            <div className="flex items-center">
                            <img className="w-10 h-10 rounded-full ring-2 ring-neutral" src={potat} alt="Rounded avatar" />
                            <p key={u.id} className="p-2 m-4 font-medium text-[20px]">
                                {u.username}
                            </p>
                            </div>
                        </div>
                    </div>
                  );
            })}
        </div>
    )
}