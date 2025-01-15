import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../fetures/userAuth/userAuthslice";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants/constants";

const Body = () => {
  const dispatch = useDispatch();
  const userFromRedux = useSelector((state) => state.userAuth.user);
  const [user, setUserState] = useState(userFromRedux || null);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(setUser(res.data.user));
      setUserState(res.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (!userFromRedux) {
      fetchUser();
    } else {
      setUserState(userFromRedux);
    }
  }, [userFromRedux]);

  return (
    <>
      {user && <NavBar />}
      <Outlet />
    </>
  );
};

export default Body;
