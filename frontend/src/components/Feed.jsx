import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./userCard";
import { BACKEND_URL } from "../constants/constants";
import { setFeed, removeFromFeed } from "../fetures/userFeed/feedSlice";
import getToken from "../constants/getToken.js";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed.feed); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const fetchFeed = async () => {
    try {
      const token = getToken("token");
      const response = await axios.get(`${BACKEND_URL}/user/feed`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.feed);
      dispatch(setFeed(response.data.feed));
    } catch (error) {
      console.error("Error fetching feed:", error.message);
    }
  };

  useEffect(() => {
    fetchFeed();
  },[]);

  const handleAction = async (action, userId) => {
    try {
      setDirection(action);
      const updatedFeed = feed.filter((user) => user._id !== userId);
      dispatch(removeFromFeed({ _id: userId }));
  
      setTimeout(() => {
        setCurrentIndex((prev) => (prev >= updatedFeed.length ? 0 : prev));
        setDirection(null);
      }, 600);
  
      const token = getToken("token");
      if (!token) {
        console.error("Token missing!");
        return;
      }
  
      await axios.post(
        `${BACKEND_URL}/request/send/${action}/${userId}`,
        {}, // <-- empty data
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error sending action:", error.message);
    }
  };
  

  return (
    <div>
      <UserCard
        user={feed[currentIndex] || {}} 
        direction={direction}
        onAction={handleAction}
      />
    </div>
  );
};

export default Feed;
