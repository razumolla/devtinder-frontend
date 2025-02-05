import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  const fetchUser = async () => {
    if (userData) return;

    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full mx-auto min-h-screen bg-[#f5f8fa]">
      <Navbar />
      <div className="mt-16 max-w-[1080px] mx-auto border border-red-600">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
