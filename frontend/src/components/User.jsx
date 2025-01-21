import { useParams } from "react-router-dom";
import Boy from "../assets/Boy.png";
import Girl from "../assets/Girl.png";
import { useEffect,useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";

const User = () => {
  const { id } = useParams();
   const [userData , setUserData] = useState(null);


  const fetchUser =  async() => {
    try {
        const response = await axios.get(`${BACKEND_URL}/profile/${id}`, {
            withCredentials: true,
        })
        console.log(response.data.user);
        setUserData(response.data.user);


        }
    catch (error) {
        console.log("Failed to fetch user data", error);

    }
    };


  useEffect(() => {
     fetchUser();
  }
    , [id]);


    if(!userData) {
        return <h1 className="text-center text-3xl font-bold mt-40 ">No user found with id: {id} ;)</h1>;
    }

  return (
    <div
      className="flex m-auto mt-10  items-center flex-col sm:flex-row w-4/4 bg-base-200 p-10 rounded-2xl shadow-xl transition-all duration-300"
      style={{ minHeight: "500px" }}
    >
      <div className="flex flex-col items-center sm:w-1/3 w-full text-center sm:text-left mb-6 sm:mb-0 justify-center">
        <img
          src={userData?.photoUrl || (userData?.gender === "male" ? Boy : Girl)}
          alt="Profile"
          className="w-48 h-48 rounded-full mb-6 border-4 border-gray-300"
        />
      </div>

      <div className="flex flex-col sm:w-2/3 w-full px-8">
        <h3 className="text-4xl mb-10 font-bold font-sans bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
          Profile Details
        </h3>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <span className="text-sm text-gray-600">First Name:</span>
            <p className="text-xl">{userData?.firstName}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Last Name:</span>
            <p className="text-xl">{userData?.lastName}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Gender:</span>
            <p className="text-xl">{userData?.gender}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Age:</span>
            <p className="text-xl">{userData?.age}</p>
          </div>
          <div className="col-span-2">
            <span className="text-sm text-gray-600">About:</span>
            <p className="text-xl">{userData?.about}</p>
          </div>
          <div className="col-span-2">
            <span className="text-sm text-gray-600">Skills:</span>
            <p className="text-xl">
              {userData?.skills.length > 0 ? userData?.skills.join(", ") : "No skills added"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
