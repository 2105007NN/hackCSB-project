import { useState, useEffect, useContext } from "react";
import io from "socket.io-client"

import { AuthContext } from "../../context/AuthProvider";
import ConnectedUsers from "./ConnectedUsers";
import Chat from "./Chat";
import Therapists from "./Therapists";
import SimilarUsers from "./SimilarUsers";
import AutoSlidingCarousel from "./AutoSlidingCarousel"; 

import chatting from '../../assets/Chatting.jpg'


const url = "http://localhost:3000"
const socket = io.connect(url)

const Support = () => {
    const { user } = useContext(AuthContext);
    const [connectedUserList, setConnectedUserList] = useState([])
    const [targetUser, setTargetUser] = useState(null)
    const [list, setList] = useState([])
    const [roomId, setRoomId] = useState("")
    const [showTherapist, setShowTherapist] = useState(false)
    const [showSimilar, setShowSimilar] = useState(false)

    function joinChat(targetUser, isTherapist=false){
        console.log("inside joinChat\n", targetUser)
        socket.emit("join_room", {currentUser: user, targetUser})
        setTargetUser(targetUser)
        console.log("Connected userlist:\n", connectedUserList);
        if(!connectedUserList.some(user => user.username == targetUser.username) && !isTherapist){
            setConnectedUserList((prev) => [{...targetUser, read: true}, ...prev])
        }
    }

    useEffect(()=>{
        console.log("Current user: ", user);
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
                    setShowTherapist={setShowTherapist}
                    setShowSimilar={setShowSimilar}
                />
            </div>
            {!targetUser && !showTherapist && !showSimilar && (
                <div className="col-span-9">
                    <AutoSlidingCarousel />
                </div>
            )}
            {!(!targetUser && !showTherapist && !showSimilar) && (
            <>
            <div className="col-span-5">
                <Chat 
                    currentUser={user}
                    targetUser={targetUser}
                    list={list}
                    setList={setList}
                    roomId={roomId}
                    setRoomId={setRoomId}
                    socket={socket}
                    connectedUserList={connectedUserList}
                    setConnectedUserList={setConnectedUserList}
                />
            </div>
            <div className="col-span-4">
                {showTherapist && (
                    <div>
                        <Therapists 
                            joinChat={joinChat}
                        />
                    </div>
                )}
                {showSimilar && (
                    <div>
                        <SimilarUsers
                            currentUser={user}
                            joinChat={joinChat}
                        />
                    </div>
                )}
            </div>
            </>)}
            
        </div>
     );
}
 
export default Support;