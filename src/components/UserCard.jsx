/* eslint-disable react/prop-types */
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, photoUrl, about, gender, age, skills } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + `/request/send/${status}/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-600 text-white rounded-lg shadow-lg  flex flex-col items-center">
      <img
        src={photoUrl}
        alt="User"
        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-700"
      />
      <h2 className="text-lg font-semibold">{firstName + " " + lastName}</h2>
      {age && gender && (
        <p className="text-sm text-gray-400">
          {age}, {gender}
        </p>
      )}
      <p className="text-sm text-center my-2">{about}</p>
      <div className="flex flex-wrap justify-center gap-2 my-2">
        {skills &&
          skills.map((skill) => (
            <span
              key={skill}
              className="bg-gray-700 text-sm text-gray-300 px-2 py-1 rounded-lg"
            >
              {skill}
            </span>
          ))}
      </div>
      <div className="flex gap-4 mt-4">
        <button
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-sm font-medium rounded-lg"
          onClick={() => handleSendRequest("ignored", user._id)}
        >
          Ignore
        </button>
        <button
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-sm font-medium rounded-lg"
          onClick={() => handleSendRequest("interested", user._id)}
        >
          Interested
        </button>
      </div>
    </div>
  );
};

export default UserCard;
