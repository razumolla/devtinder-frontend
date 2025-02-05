import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import Chat from "./Chat";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  return (
    <div className="flex h-screen">
      {/* Left Side - Connections List */}
      <div className="w-1/3 bg-gray-800 p-4 overflow-auto">
        <h1 className="text-bold text-white text-2xl mb-4">Connections</h1>

        {connections.length === 0 ? (
          <h2 className="text-white">No Connections Found</h2>
        ) : (
          connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl } = connection;
            return (
              <div
                key={_id}
                className="flex items-center p-3 cursor-pointer bg-gray-700 rounded-lg mb-2 hover:bg-gray-600"
                onClick={() => setSelectedUser(connection)}
              >
                <img
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover"
                  src={photoUrl}
                />
                <div className="ml-3 text-white">
                  <h2 className="font-bold">{firstName + " " + lastName}</h2>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Right Side - Chat Box */}
      <div className="w-2/3 bg-gray-900">
        {selectedUser ? (
          <Chat targetUser={selectedUser} />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            <h2>Select a user to start chatting</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
