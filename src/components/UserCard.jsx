import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

/* eslint-disable react/prop-types */
const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, photoUrl, about, gender, age, skills } = user;

  //- POST /request/send/:status/:userId //=> status: ignored, interested
  const handleSendRequest = async (status, userId) => {
    await axios.post(
      BASE_URL + `/request/send/${status}/${userId}`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(removeUserFromFeed(userId));
  };
  return (
    <div>
      <div className="card card-compact bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt="Photo of user" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <p>
            {skills &&
              skills.map((skill) => {
                return (
                  <span
                    key={skill}
                    className="bg-slate-500 mr-1 p-1 rounded-lg"
                  >
                    {skill}
                  </span>
                );
              })}
          </p>

          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", user._id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", user._id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
