import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const AuthCard = () => {
  const [email, setEmail] = useState("vivek@gmail.com");
  const [password, setPassword] = useState("Vivek@123");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/signin`,
        { email, password },
        { withCredentials: true }
      );

      toast.success(response.data.message);
      setIsLoading(false);

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative card bg-base-200 text-neutral-content w-96 mx-auto mt-16 dark:bg-gray-800">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-white">Welcome to dev.Tinder!</h2>
        <form onSubmit={handleLogin} className="w-full">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral-content">Email</span>
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
              <span className="label-text text-neutral-content">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="card-actions justify-center mt-4">
            <button
              type="submit"
              className="btn btn-primary hover:bg-blue-600 transition-colors duration-300 w-full"
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
                  colors={["#3b82f6", "#2563eb", "#1e40af", "#1d4ed8", "#3b82f6"]}
                />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="mt-4 text-sm text-neutral-content">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>

      {/* Toaster for react-hot-toast */}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default AuthCard;
