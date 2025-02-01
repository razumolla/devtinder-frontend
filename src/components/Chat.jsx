import { useParams } from "react-router-dom";

const Chat = () => {
  const { targetUserId } = useParams();
  console.log(targetUserId);
  return (
    <div className="w-1/2 mx-auto border border-gray-600 h-[70vh] p-5">
      <h1 className="p-5 border-b border-l-gray-800">Chat</h1>

      <div>{/* display chat messages here */}</div>

      <div>
        <input
          type="text"
          placeholder="Type your message here"
          className="w-3/4 p-2 rounded-lg border border-gray-300"
        />
        <button className="btn btn-primary">Send</button>
      </div>
    </div>
  );
};

export default Chat;
