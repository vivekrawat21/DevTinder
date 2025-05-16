import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../fetures/connections/connectionsSlice";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";
import FriendCard from "./FriendCard";
import Connection from "../assets/connection.png"
import getToken from "../constants/getToken.js";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const token = getToken("token");
      const response = await axios.get(`${BACKEND_URL}/user/connections`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data.data);
        dispatch(addConnection(response.data.data));
      }
    } catch (error) {
      console.log("Network error. Please try again." + error);
    }
  };



  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections.connections.length === 0) {
    return <h1 className="text-center text-3xl font-bold mt-40 ">No connections to show ;)</h1>;
  }

  return (
    <>
      <h1 className="text-center my-12 text-4xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent  hover:bg-gradient-to-r hover:from-cyan-400 hover:via-cyan-600 hover:to-blue-600 mr-1 ">Connections <img src={Connection} className="inline-block items-center" width={38} alt="conn" /></h1>
      <div className="flex flex-wrap justify-center gap-6">
        {connections.connections.map((connection) => (
          <FriendCard
            key={connection._id}
            connection={connection}
          />
        ))}
      </div>
 
    </>
  );
};

export default Connections;
