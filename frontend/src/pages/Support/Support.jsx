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
    const [list, setList] = useState([])
    const [roomId, setRoomId] = useState("")

    function joinChat(targetUser){
        console.log("inside joinChat\n", targetUser)
        socket.emit("join_room", {currentUser: user, targetUser})
        setTargetUser(targetUser)
        console.log("Connected userlist:\n", connectedUserList);
        if(!connectedUserList.some(user => user.username == targetUser.username)){
            setConnectedUserList((prev) => [...prev, targetUser])
        }
    }

    useEffect(()=>{
        fetch("http://localhost:3000/connected/users/" + user.username)
        .then(res => res.json())
        .then(res => {
            console.log("Connected Userlist received:\n", res.data);
            setConnectedUserList(res.data)
        })
    }, [])

    useEffect(() => {
        if(targetUser !== null){
            console.log("Current user: ", user.username);
            console.log("Target user: ", targetUser.username);
            const params = new URLSearchParams({
            currentUser: user.username,
            targetUser: targetUser.username
        });
        const url = `http://localhost:3000/chatlist?${params.toString()}`;
        fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            const r = res.data.chats.map(c => {
                return {
                    content: c.content,
                    author: c.author,
                    time: c.time,
                    room_id: res.room_id
                }
            })
            setList(r)
            setRoomId(res.data.room_id)
        })
        }

        console.log("Chatlist: ", list);
        console.log("roomID: ", roomId);

    }, [targetUser])

    return ( 
        <div className="grid grid-cols-12 h-[680px] gap-4">
            <div className="col-span-3">
                <ConnectedUsers 
                    connectedUserList={connectedUserList}
                    setConnectedUserList={setConnectedUserList}
                    targetUser={targetUser}
                    setTargetUser={setTargetUser}
                    socket={socket}
                    currentUser={user}
                    joinChat={joinChat}
                />
            </div>
            <div className="col-span-5">
                <Chat 
                    currentUser={user}
                    targetUser={targetUser}
                    list={list}
                    setList={setList}
                    roomId={roomId}
                    setRoomId={setRoomId}
                    socket={socket}
                />
            </div>
            <div className="col-span-4 grid grid-rows-2">
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