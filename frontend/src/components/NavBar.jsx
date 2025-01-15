import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { FaSun, FaMoon } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import { logoutUser } from "../fetures/userAuth/userAuthslice";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../constants/constants";
import axios from "axios";

const NavBar = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const user = useSelector((state) => state.userAuth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/signout`, {
        withCredentials: true,
      });

      if (response.status == 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          dispatch(logoutUser());
          navigate("/login");
        }, 500);
      }
    } catch (error) {
      toast.error("Network error. Please try again." + error);
    }
  };

  return (
    <div className="navbar bg-base-100 dark:bg-gray-800 shadow-xl mb-4 transition-colors duration-300 mt-4 max-w-7xl mx-auto rounded-lg backdrop-blur-md bg-opacity-30">
      <div className="navbar-start">
        <Link to="/" className="text-xl flex items-center space-x-2">
          <span className="font-extrabold">
            dev
            <span className="font-extrabold text-blue-400">.Tinder</span>
          </span>
        </Link>
      </div>
      <div className="navbar-center space-x-4">
        <Link
          to="/profile"
          className="btn btn-ghost text-lg rounded-lg transition-all duration-300 hover:text-blue-400 hover:bg-transparent"
        >
          Profile
        </Link>
        <Link
          to="/connections"
          className="btn btn-ghost text-lg rounded-lg transition-all duration-300 hover:text-blue-400 hover:bg-transparent"
        >
          Connections
        </Link>
      </div>
      <div className="navbar-end flex items-center space-x-4">
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
          {theme === "dark" ? (
            <FaMoon className="text-gray-500" />
          ) : (
            <FaSun className="text-white-400" />
          )}
        </button>
        <div className="dropdown">
          <button className="btn btn-ghost btn-circle avatar">
            <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-2">
              {user ? (
                <img
                  src={user.photoUrl || "https://placeimg.com/80/80/people"}
                  alt="user profile"
                  className="object-cover opacity-80 transition-opacity duration-300"
                />
              ) : (
                <HiUserCircle className="w-full h-full text-gray-500" />
              )}
            </div>
          </button>
          <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-3">
            <li>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
