/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {useState, useEffect, useRef} from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import potat from '../../assets/potat.jpg'
import send from '../../assets/send.png'
import {useToxicityModel, getToxicityPredictions} from '../../context/ModelProvider'

// eslint-disable-next-line react/prop-types
const Chat = ({currentUser, targetUser, list, setList, roomId, setRoomId, socket, connectedUserList, setConnectedUserList}) => {
    const [message, setMessage] = useState("")
    const bottomRef = useRef(null);
    const currimgUrl = currentUser?.profileImg?.substring(6 + 1);
    const targetimgUrl = targetUser?.profileImg?.substring(6 + 1);
    const model = useToxicityModel();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [list]);

    async function sendMessage() {
        console.log(`sending from ${currentUser.username} to ${targetUser.username}`);
        
        if (message !== "") {
            const data = {
                room_id: roomId,
                author: currentUser.username,
                receiver: targetUser.username,
                content: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };

            let issues = await getToxicityPredictions(model, message);
            if(issues.length !== 0){
                let message = "YOUR MESSAGE CONTAINS : \n";
                issues.forEach((issue, indx) => {
                    message += (indx + 1).toString() + ". " + issue + '\n';
                })
                message += 'PLEASE REFRAIN FROM USING SUCH LANGUAGE.'
                alert(message);
                return;
            }

            await socket.emit("send_message", data);
            setList((prev) => [...prev, data]);
            setMessage("");
            const t = connectedUserList.find(user => user.username === targetUser.username)
            if (t){
                setConnectedUserList(prev => {
                const t2 = prev.filter(user => user.username !== targetUser.username)
                return [{...t, read: true}, ...t2]
            })}
        }
    }

    useEffect(() => {
        const handleMessageReceive = (data) => {
            console.log("received in " + currentUser.username + "in room " + data.room_id);
            
            if (data.room_id === roomId) {
                setList((prev) => [...prev, data]);
                socket.emit("set_read", {room_id: data.room_id, user: currentUser.username})
            }
            else{
                socket.emit("set_unread", {room_id: data.room_id, user: currentUser.username})
                const t = connectedUserList.find(user => user.username === data.author)
                if (t){
                    setConnectedUserList(prev => {
                    const t2 = prev.filter(user => user.username !== data.author)
                    return [{...t, read:false}, ...t2]
                })}
            }
            console.log("list of connected users:\n", connectedUserList);
            
        };

        socket.on("receive_message", handleMessageReceive);

        // Cleanup to avoid duplicate listeners
        return () => {
            socket.off("receive_message", handleMessageReceive);
        };
    }, [roomId, socket]);
    
    return (
        <div className="p-3 bg-base-300">
            {!targetUser && (
                <div>
                    Start chatting...
                </div>
            )}
            {targetUser && 
            (
            <>
                <div className="p-4 mb-5 bg-gradient-to-r from-primary via-secondary to-accent text-lg text-neutral font-bold rounded">
                    <h1>Chatroom: {currentUser.username} & {targetUser.username}</h1>
                </div>
                <div class="flex-row items-start gap-2.5 h-[500px]">
                <ScrollToBottom className="h-[500px] overflow-y-auto overflow-x-hidden p-4">
                {list.map((m, index) => {
                    const isCurrentUser = m.author === currentUser.username;
                    return (
                    <div
                        key={index}
                        className={`flex items-center gap-2 m-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                        {!isCurrentUser && (
                        <img
                            className="w-8 h-8 rounded-full"
                            src={targetimgUrl ? `http://localhost:3000/${targetimgUrl}` : potat}
                            alt="User"
                        />
                        )}
                        <div
                        className={`flex flex-col gap-1 max-w-[320px] ${
                            isCurrentUser ? 'items-end' : 'items-start'
                        }`}
                        >
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold text-base-content">
                            {m.author}
                            </span>
                            <span className="text-sm font-normal text-base-content">
                            {m.time}
                            </span>
                        </div>
                        <div
                            className={`flex flex-col leading-1.5 p-4 bg-neutral rounded-xl text-neutral-content ${
                            isCurrentUser ? 'bg-blue-500' : ''
                            }`}
                        >
                            <p className=" font-normal">{m.content}</p>
                        </div>
                        <span className="text-sm font-normal text-base-content">
                            Delivered
                        </span>
                        </div>
                        {isCurrentUser && (
                        <img
                            className="w-8 h-8 rounded-full"
                            src={currimgUrl ? `http://localhost:3000/${currimgUrl}` : potat}
                            alt="User"
                        />
                        )}
                    </div>
                    );
                })}
                </ScrollToBottom>

                </div>
                <div className="h-[50px] mt-4 flex gap-2">
                    <input 
                        type="text" 
                        id="default-input" 
                        placeholder="message..." 
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        onKeyPress={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                        autoComplete="off"
                        class="bg-neutral border border-neutral-content text-neutral-content text-lg rounded-lg focus:ring-success focus:border-success block w-full p-2.5" 
                    />
                    <button 
                        type="button" 
                        onClick={sendMessage}
                        class="btn btn-primary text-primary-content"
                    ><img src={send} className="w-8 h-8"/></button>
                </div>
            </>
            )}
        </div>
    )
}
// "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
// "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
export default Chat;