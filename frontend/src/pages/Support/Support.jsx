import { useState, useEffect, useContext } from "react";
import io from "socket.io-client"

import { AuthContext } from "../../context/AuthProvider";
import ConnectedUsers from "./ConnectedUsers";
import Chat from "./Chat";
import Therapists from "./Therapists";
import SimilarUsers from "./SimilarUsers";


const url = "http://localhost:3000"
const socket = io.connect(url)

const Support = () => {
    const { user, setUser } = useContext(AuthContext);
    const [connectedUserList, setConnectedUserList] = useState([])
    const [targetUser, setTargetUser] = useState(null)

    useEffect(()=>{
        fetch("http://localhost:3000/users")
        .then(res => res.json())
        .then(res => {
            console.log("Userlist received:\n", res.data);
            setConnectedUserList(res.data)
        })
    }, [])

    return ( 
        <div className="grid grid-cols-3 h-screen gap-4">
            <div className="col-span-1">
                <ConnectedUsers 
                    connectedUserList={connectedUserList}
                    setConnectedUserList={setConnectedUserList}
                    targetUser={targetUser}
                    setTargetUser={setTargetUser}
                    socket={socket}
                    currentUser={currentUser}
                />
            </div>
            <div className="col-span-1">
                <Chat />
            </div>
            <div className="col-span-1 grid grid-rows-2">
                <div className="row-span-1">
                    <Therapists />
                </div>
                <div className="row-span-1">
                    <SimilarUsers />
                </div>
                
            </div>
        </div>
     );
}
 
export default Support;