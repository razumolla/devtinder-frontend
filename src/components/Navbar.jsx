import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import {
  FaHome,
  FaUserFriends,
  FaBell,
  FaCommentDots,
  FaBriefcase,
} from "react-icons/fa";
import logo from "/mentor.png";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#edf6f9] shadow-md px-4  fixed top-0 left-0 w-full z-10">
      <div className="navbar max-w-[1280px] mx-auto">
        {/* Left - Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <img src={logo} alt="logo" className="w-10 h-10" />
            Mentor
          </Link>
        </div>

        {/* Center - Search Bar */}
        <div className="flex flex-grow justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-96 rounded-full px-4"
          />
        </div>

        {/* Right - Navigation Icons and Profile */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-black text-lg">
            <FaHome size={24} />
          </Link>
          <Link
            to="/connections"
            className="text-gray-600 hover:text-black text-lg"
          >
            <FaUserFriends size={24} />
          </Link>
          <Link
            to="/notifications"
            className="text-gray-600 hover:text-black text-lg"
          >
            <FaBell size={24} />
          </Link>
          <Link
            to="/messages"
            className="text-gray-600 hover:text-black text-lg"
          >
            <FaCommentDots size={24} />
          </Link>
          <Link to="/jobs" className="text-gray-600 hover:text-black text-lg">
            <FaBriefcase size={24} />
          </Link>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Photo" src={user?.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box shadow-md mt-3 w-52 p-2"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/premium">Premium</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
