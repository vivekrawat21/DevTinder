import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./userCard";
import { BACKEND_URL } from "../constants/constants";
import { setFeed } from "../fetures/userFeed/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed); 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [direction, setDirection] = useState(null); 

  const fetchFeed = async () => {
    if (feed.length > 0) return; 
    try {
      const response = await axios.get(`${BACKEND_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(setFeed(response.data.feed));
    } catch (error) {
      console.error("Error fetching feed:", error.message);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleAction = async (action, userId) => {
    try {
      setDirection(action); 
      await axios.post(
        `${BACKEND_URL}/request/send/${action}/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % feed.length); // Move to next user
        setDirection(null);
      }, 600); 
    } catch (error) {
      console.error("Error sending action:", error.message);
    }
  };

  if (!feed.length) {
    return <div>Loading feed...</div>; 
  }

  return (
    <div>
      <UserCard
        user={feed[currentIndex]} // Current user
        direction={direction} // Animation direction
        onAction={handleAction} // Pass action handler
      />
    </div>
  );
};

export default Feed;
