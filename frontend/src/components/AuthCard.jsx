import { useState, useContext } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
import ThemeContext from "../contexts/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUser } from "../fetures/userAuth/userSlice";

const AuthCard = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/signin`,
        { email, password },
        { withCredentials: true }
      );

      if (response.status == 200) {
        toast.success(response.data.message);
        setIsLoading(false);
        dispatch(setUser(response.data.user));

        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={` mt-32 relative card bg-base-200  w-3/12 mx-auto itme transition-colors duration-300 shadow-md `}
    >
      <div className="card-body items-center text-center">
        <span className="font-semibold text-xl">
          Welcome to <span className="font-extrabold">dev.</span>
          <span className="font-extrabold text-blue-400">Tinder</span>
        </span>

        <form onSubmit={handleLogin} className="w-full">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-fulldark:border-gray-600"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="card-actions justify-center mt-4">
            <button
              type="submit"
              className="btn bg-blue-400 hover:bg-blue-500 text-black transition-colors duration-300 w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#3b82f6",
                    "#2563eb",
                    "#1e40af",
                    "#1d4ed8",
                    "#3b82f6",
                  ]}
                />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="mt-4 text-sm">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 btn btn-ghost btn-circle"
      >
        {theme === "dark" ? (
          <FaSun className="text-gray-500" />
        ) : (
          <FaMoon className="text-white-400" />
        )}
      </button>

      {/* Toaster for react-hot-toast */}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default AuthCard;
