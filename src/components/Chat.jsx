import { useEffect, useState } from "react";
import { CreateSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Chat = ({ targetUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const targetUserId = targetUser?._id;

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + `/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.data?.messages.map((msg) => ({
        firstName: msg.senderId?.firstName,
        lastName: msg.senderId?.lastName,
        text: msg.text,
        time: msg.createdAt,
      }));

      setMessages(chatMessages);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("messages---" ,messages);

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = CreateSocketConnection();
    // Emit joinChat event when the chat loads
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text,time }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, lastName, text,time },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

     // Create a local timestamp
  const time = new Date().toISOString();

    const socket = CreateSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
      time
    });

    setNewMessage("");
  };

  return (
    <div className="h-[90%] flex flex-col bg-white border-r border-gray-300">
      {/* Chat Header */}
      <div className="p-4 bg-[#f5f8fa] text-gray-800 border-b border-gray-300 flex justify-between items-center ">
        <h2 className="text-xl font-bold">
          {targetUser?.firstName} {targetUser?.lastName}
        </h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages?.map((msg, index) => {
          const isCurrentUser = user.firstName === msg.firstName;

          const dateObj = new Date(msg.time);
          const msgSendTime = dateObj.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true, // or false for 24-hour format
          });
          return (
            <div
              key={index}
              className={`mb-4 flex flex-col ${
                isCurrentUser ? "items-end" : "items-start"
              }`}
            >
              <div className="text-sm text-gray-600">
                {msg.firstName} {msg.lastName}{" "}
                <span className="text-xs text-gray-500">
                  {msgSendTime }
                </span>
              </div>
              <div
                className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                  isCurrentUser
                    ? "bg-blue-100 text-gray-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
              <div className="text-xs text-gray-500 mt-1">Seen</div>
            </div>
          );
        })}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-300 flex items-center">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            // Send message on Enter (without Shift) press
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          className="flex-1 border border-gray-300 text-gray-800 rounded p-2 bg-gray-50 min-h-[80px]"
          placeholder="Type a message..."
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
