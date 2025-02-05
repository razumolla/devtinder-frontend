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

      const chatMessages = chat?.data?.data?.messages.map((msg) => {
        return {
          firstName: msg.senderId?.firstName,
          lastName: msg.senderId?.lastName,
          text: msg.text,
        };
      });

      setMessages(chatMessages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = CreateSocketConnection();
    // As soon as the page loaded, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = CreateSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-gray-800 text-white">
        <h2 className="text-xl font-bold">
          {targetUser?.firstName} {targetUser?.lastName}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={
              "chat " +
              (user.firstName === msg.firstName ? "chat-end" : "chat-start")
            }
          >
            <div className="chat-header">
              {msg.firstName + " " + msg.lastName}
              <time className="text-xs opacity-50"> 2 hours ago</time>
            </div>
            <div className="chat-bubble"> {msg.text}</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-700 flex items-center">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2 bg-gray-800"
          placeholder="Type a message..."
        />
        <button className="btn btn-secondary ml-2" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
