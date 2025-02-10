import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { removeRequest,addRequest } from "../fetures/requests/requestsSlice";
import { toast, Toaster } from "react-hot-toast";
import FriendCard from "./FriendCard";
import { BACKEND_URL } from "../constants/constants";
import axios from "axios";
import Friend from "../assets/request.png";


const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests.requests);


  const acceptRequest = async (requestId) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/request/review/accepted/${requestId}`,
        {},
        { withCredentials: true }
      );

      console.log("Response:", response);
      if (response.status === 200) {
        dispatch(removeRequest({ _id: requestId }));
        console.log("Request accepted", response.data.message);
      }
    } catch (error) {
      console.log("Failed to accept request", error);
    }
  } 

  const rejectRequest = async (requestId) => { 
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/request/review/rejected/${requestId}`,
        {},
        { withCredentials: true }
      );
      console.log("Response:", response);
      if (response.status === 200) {
        dispatch(removeRequest({ _id: requestId }));
        console.log("Request rejected", response.data.message);

      }
    } catch (error) {
      console.log("Failed to reject request", error);
    }
  }



  const handleAccept = (requestId) => {
       acceptRequest(requestId); 
         toast.success(`Accepted`);
  };

  const handleReject = (requestId) => {
    rejectRequest(requestId);
    console.log("Rejected:", requestId);
    toast.success(`Rejected`);
  };

  const fetchRequests = async () => { 
    try {
      const response = await axios.get(`${BACKEND_URL}/api/user/requests/received`,{
        withCredentials: true
      });
      if (response.status === 200) {
        dispatch(addRequest(response.data.requests));
      }
    } catch (error) {
      console.log("Failed to fetch requests", error);
    }
  }
  useEffect(() => {
    
    fetchRequests();
  }, []);

  if(requests.length==0){
    return <h1 className="text-center text-3xl font-bold mt-40">No requests to show ;)</h1>;
  }
  return (
    <div> 
      <h1 className="text-center my-12 text-4xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent  hover:bg-gradient-to-r hover:from-cyan-400 hover:via-cyan-600 hover:to-blue-600 mr-1 flex justify-center items-center gap-2">Requests <img src={Friend} className=" inline-block pb-3 " width={38} alt="req" /></h1>
    <div className="flex flex-wrap justify-center gap-6 ">
  
      {requests.map((request) => (

        <FriendCard
          key={request._id}
          onAccept={handleAccept}
          onReject={handleReject}
          connection={request?.fromUserId}
          requestId = {request._id}
          isRequest={true}
        />
      ))}
    </div>
    <Toaster />
  
    </div>
  )
}

export default Request