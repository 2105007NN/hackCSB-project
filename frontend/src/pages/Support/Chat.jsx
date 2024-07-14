import {useState, useEffect, useRef} from "react"
import ScrollToBottom from "react-scroll-to-bottom"

const Chat = ({currentUser, targetUser, list, setList, roomId, setRoomId, socket}) => {
    const [message, setMessage] = useState("")
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [list]);

    async function sendMessage() {
        if (message !== "") {
            const data = {
                room_id: roomId,
                author: currentUser.username,
                content: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };

            console.log("inside sendMessage\n", data);

            await socket.emit("send_message", data);
            setList((prev) => [...prev, data]);
            setMessage("");
        }
    }

    useEffect(() => {
        const handleMessageReceive = (data) => {
            console.log(data.room_id, roomId);
            if (data.room_id === roomId) {
                setList((prev) => [...prev, data]);
            }
        };

        socket.on("receive_message", handleMessageReceive);

        // Cleanup to avoid duplicate listeners
        return () => {
            socket.off("receive_message", handleMessageReceive);
        };
    }, [roomId, socket]);

    
    return (
        <div className="p-3 bg-gray-800">
            {!targetUser && (
                <div>

                </div>
            )}
            {targetUser && 
            (
            <>
                <div className="p-4 mb-5 bg-gray-900 text-lg font-bold rounded">
                    <h1>Chatroom: {currentUser.username} & {targetUser.username}</h1>
                </div>
                <div class="flex-row items-start gap-2.5 h-[500px]">
                <ScrollToBottom className="h-[500px] overflow-y-auto overflow-x-hidden p-4">
                {list.map((m, index) => {
                    const isCurrentUser = m.author === currentUser.username;
                    return (
                    <div
                        key={index}
                        className={`flex m-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                        {!isCurrentUser && (
                        <img
                            className="w-8 h-8 rounded-full"
                            src="/docs/images/people/profile-picture-3.jpg"
                            alt="User"
                        />
                        )}
                        <div
                        className={`flex flex-col gap-1 max-w-[320px] ${
                            isCurrentUser ? 'items-end' : 'items-start'
                        }`}
                        >
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {m.author}
                            </span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {m.time}
                            </span>
                        </div>
                        <div
                            className={`flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700 text-white ${
                            isCurrentUser ? 'bg-blue-500' : ''
                            }`}
                        >
                            <p className=" font-normal">{m.content}</p>
                        </div>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Delivered
                        </span>
                        </div>
                        {isCurrentUser && (
                        <img
                            className="w-8 h-8 rounded-full"
                            src="/docs/images/people/profile-picture-3.jpg"
                            alt="User"
                        />
                        )}
                    </div>
                    );
                })}
                </ScrollToBottom>

                </div>
                <div className="h-[50px] mt-4 flex">
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
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    />
                    <button 
                        type="button" 
                        onClick={sendMessage}
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >Send</button>
                </div>
            </>
            )}
        </div>
    )
}

export default Chat;