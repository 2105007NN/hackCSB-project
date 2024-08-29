import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import potat from '../../assets/potat.jpg'
import { IoArrowRedo } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export default function Friends () {
    const { user, setUser } = useContext(AuthContext);
    const [friendList, setFriendList] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/connected/users/" + user?.username)
        .then(res => res.json())
        .then(res => {
            setFriendList(res.data)
        })
    }, [])

    return (
        <div>
            {friendList.map((u) => {
                //const imgUrl = u?.profileImg?.substring(6 + 1);
                const imgUrl = `${u.username}.jpg`
                return (
                    <div className="m-2 pl-4 bg-base-100 border border-info rounded-lg">
                        <div className="flex items-center justify-between rounded-lg">
                            <div className="flex items-center">
                                <img
                                    className="w-10 h-10 rounded-full ring-2 ring-neutral"
                                    src={imgUrl ? `http://localhost:3000/${imgUrl}` : potat}
                                    alt="Rounded avatar"
                                />
                                <p key={u.id} className="p-2 m-4 font-medium text-[20px]">
                                    {u.username}
                                </p>
                            </div>
                            <button className="mr-4 btn btn-primary" title='Profile' onClick={() => navigate(`/user/profile/${u.username}`)}>
                                <IoArrowRedo className='text-black w-6 h-6'/>
                            </button>
                        </div>
                    </div>
                  );
            })}
        </div>
    )
}