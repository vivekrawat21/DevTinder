import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { FaSun, FaMoon, FaHamburger } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import { logoutUser } from "../fetures/userAuth/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { BACKEND_URL } from "../constants/constants";
import axios from "axios";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineFeed } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { useState } from "react";
import {clearFeed} from "../fetures/userFeed/feedSlice"
import { clearRequests } from "../fetures/requests/requestsSlice";
import { clearConnections } from "../fetures/connections/connectionsSlice";
import getToken from "../constants/getToken.js";

const NavBar = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [Loading, setLoading] = useState(false);


  const handleLogout = async () => {
    try {
      setLoading(true);
      const token = getToken("token");

      const response = await axios.get(`${BACKEND_URL}/api/signout`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
       
        toast.success(response.data.message);
        dispatch(logoutUser());
        dispatch(clearFeed());
        dispatch(clearRequests());
        dispatch(clearConnections());
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      console.log("Failed to logout", error);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="navbar bg-base-200 dark:bg-gray-800 shadow-xl mb-4 transition-colors duration-500 ease-in-out mt-4 max-w-7xl mx-auto rounded-lg backdrop-blur-md bg-opacity-60  sticky top-0 z-50"> 
      <div className="navbar-start">
        <Link to="/" className="text-xl flex items-center space-x-2">
          <span className="font-extrabold">
            dev
            <span className="font-extrabold bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500   bg-clip-text text-transparent">.Tinder</span>
          </span>
        </Link>
      </div>

      <div className=" navbar-center flex items-center ">
        <div className="flex items-center space-x-2">
          <label
            htmlFor="theme-switch"
            className="flex items-center cursor-pointer"
          >
            <div
              className={`relative w-14 h-8 rounded-full border-2 border-gray-600 dark:border-gray-400 ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-300"
              } transition-all duration-300`}
            >
              <div
                className={`absolute left-1 top-1 w-6 h-6 flex items-center justify-center transition-all duration-300 ${
                  theme === "dark" ? "opacity-50" : "opacity-100"
                }`}
              >
                <FaSun className="text-yellow-400" />
              </div>
              <div
                className={`absolute right-1 top-1 w-6 h-6 flex items-center justify-center transition-all duration-300 ${
                  theme === "dark" ? "opacity-100" : "opacity-50"
                }`}
              >
                <FaMoon className="text-blue-500" />
              </div>
              <input
                type="checkbox"
                id="theme-switch"
                className="hidden"
                onChange={toggleTheme}
                checked={theme === "dark"}
              />
              <div
                className={`w-7 h-7 bg-white rounded-full absolute top-1 transition-all duration-300 ${
                  theme === "dark" ? "transform translate-x-6" : ""
                }`}
              />
            </div>
          </label>
        </div>
      </div>

      <div className="navbar-end flex items-center space-x-1">
        <div className="hidden lg:block">
          welcome- &#123;
          <span className="font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600">
            {user?.firstName}
          </span>
          &#125;
        </div>

        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle hidden"
        />
        <div className="drawer-content sm:hidden">
          <label htmlFor="my-drawer">
            <FaHamburger className="text-2xl text-gray-500" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-[5.7rem]  ">
            <li className="mt-3 text-xl  cursor-pointer">
              <Link to={"/profile"}>
                <CgProfile className="w-10 " />
              </Link>
            </li>

            <li className="text-xl  cursor-pointer">
              <Link to={"/"}>
                <MdOutlineFeed className="w-10" />
              </Link>
            </li>

            <li className="text-lg  cursor-pointer">
              <Link to={"/connections"}>
                <FaUserFriends className="w-10" />
              </Link>
            </li>
            <li className="text-lg  cursor-pointer">
              <Link to="/requests">
              <LiaUserFriendsSolid className="w-10" />
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-red-500 text-2xl mt-5"
              >
                <TbLogout2 className="w-8" />
              </button>
            </li>
          </ul>
        </div>
        <div className="dropdown hidden sm:block">
          <button className="btn btn-ghost btn-circle avatar  ">
            <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-2">
              {user?.photoUrl ? (
                <img
                  src={user?.photoUrl}
                  alt="user profile"
                  className="object-cover opacity-80 transition-opacity duration-300"
                />
              ) : (
                <HiUserCircle className="w-full h-full text-gray-500" />
              )}
            </div>
          </button>

          <ul className="dropdown-content menu sm:p-2 rounded-box p-0 shadow-lg bg-base-100  mt-2 ">
            <li>
              <Link to="/profile">
                <CgProfile className="inline-block" /> Profile
              </Link>
            </li>
            <li>
              <Link to="/">
                <MdOutlineFeed className="inline-block" /> Feed{" "}
              </Link>
            </li>
            <li>
              <Link to="/connections">
                
                <FaUserFriends className="inline-block" /> Connections
              </Link>
            </li>
            <li>
              <Link to="/requests"><LiaUserFriendsSolid className="inline-block" /> Requests</Link>
            </li>
            <hr className="w-[80%] opacity-15 ml-auto mr-auto mt-3" />
            <li>
              <button onClick={handleLogout} className="text-red-500 ml-auto mr-auto">
                <TbLogout2 className="inline-block" /> {Loading ? (<span className="loading loading-spinner text-error"></span>) : "Logout"}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Toaster  />
    </div>
  );
};

export default NavBar;
