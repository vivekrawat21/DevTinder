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
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";



const AuthCard = ({ isSignUp = false }) => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [skills, setSkills] = useState([]);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleAuth = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const data = isSignUp
      ? { email, password, firstName, lastName, skills, age, gender }
      : { email, password };

    const endpoint = isSignUp ? "/signup" : "/signin";
    try {
      const response = await axios.post(
        `${BACKEND_URL}/${endpoint}`,
        data,
        { withCredentials: true }
      );
      if(endpoint === "/signin"){
        const token = response.data.token;

        // Set token with expiration in minutes
          localStorage.setItem("token", token);
        

  
      }

      if (response.status === 200 && !isSignUp) {
        toast.success(response.data.message);
        setIsLoading(false);
        dispatch(setUser(response.data.user));
          navigate("/");       
      }
      if (response.status === 200 && isSignUp) {
        toast.success(response.data.message);
        setIsLoading(false);
        navigate("/login");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.response?.data?.error  ||error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div
      className={`relative card bg-base-200 mx-auto transition-colors duration-300 shadow-md rounded-2xl mb-8 ${
  isSignUp ? 'mt-3 lg:w-6/12 ' : 'mt-32 lg:w-1/4'
} sm:w-8/12`}
    >
      <div className="card-body items-center text-center">
        <span className="font-semibold text-xl">
          {isSignUp ? "SignUp" : "Login"} to <span className="font-extrabold">dev.</span>
          <span className="font-extrabold bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Tinder
          </span>
        </span>

        <form onSubmit={handleAuth} className="w-full">
          {isSignUp && (
            <>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text"> Age</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  className="select select-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Skills</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter skills (comma-separated)"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value.split(","))}
                  required
                />
              </div>
            </>
          )}

    
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control mt-4 </input> relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 relative "
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute   right-4  top-[3.2rem] "
            >
              {showPassword ? <FaRegEye  className="text-cyan-500"/>:<FaRegEyeSlash className="text-cyan-500"/>}
            </button>
           
          </div>

          <div className="card-actions justify-center mt-4">
            <button
              type="submit"
              className="btn bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 text-black transition-colors duration-300 w-full"
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
                isSignUp ? "Sign Up" : "Login"
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 text-sm">
          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent"
              >
                Login here
              </Link>
            </p>
          ) : (
            <p>
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent"
              >
                Sign up here
              </Link>
            </p>
          )}
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
