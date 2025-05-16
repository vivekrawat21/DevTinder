import { useNavigate, Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../fetures/userAuth/userSlice";
import { BACKEND_URL } from "../constants/constants";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import FloatingBanner from "./FloatingBanner";
import  getToken  from "../constants/getToken.js";



const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userFromRedux = useSelector((store) => store.user); // Redux state
  const fetchUser = async () => {
    try {
      if (userFromRedux?.user) {
        return;
      }
      const token = getToken("token");

      const res = await axios.get(`${BACKEND_URL}/api/profile/view`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      dispatch(setUser(res?.data?.user));
    } catch (error) {
      if (error.status == 401) {
        toast.error("Please login to continue");
        navigate("/login");
      }
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
      <FloatingBanner />

    </>
  );
};

export default Body;
