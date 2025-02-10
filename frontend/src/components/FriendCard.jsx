import { IoIosMale } from "react-icons/io";
import { IoFemale } from "react-icons/io5";
import { IoMaleFemaleOutline } from "react-icons/io5";
import Boy from "../assets/Boy.png";
import Girl from "../assets/Girl.png";
import { Link } from "react-router-dom";

const FriendCard = ({ connection, isRequest, onAccept, onReject, requestId }) => {
  const defaultPhoto = connection?.gender === "male" ? Boy : Girl;
  const photoUrl = connection?.photoUrl || defaultPhoto;
  return (
    <div className="card w-full lg:w-1/4 bg-base-200 shadow-md rounded-xl m-4 p-4 hover:shadow-lg transition-transform transform hover:scale-105">
      <div className="card-body flex flex-col items-center gap-4">
        <Link to={`/user/${connection?._id}`}>
          <div className="relative flex-shrink-0">
            <img
              src={photoUrl}
              alt={`${connection?.firstName} ${connection?.lastName}'s avatar`}
              className="w-20 h-20 rounded-full object-cover border border-gray-700"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-center text-center w-full">
          <Link to={`/user/${connection?._id}`}>
            <h2 className="text-lg font-semibold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600">
            &lt; {connection?.firstName} {connection?.lastName}/&gt;
            </h2>
          </Link>
          <div className="items-center mb-1 flex justify-center">
            {connection?.gender === "male" ? (
              <IoIosMale className="text-blue-400 p-1" size={20} />
            ) : connection?.gender === "female" ? (
              <IoFemale className="text-pink-400 p-1" size={20} />
            ) : (
              <IoMaleFemaleOutline className="text-yellow-400" size={20} />
            )}
            <span className="text-gray-400 capitalize">{connection.gender}</span>
          </div>
          <p className="text-sm">Age: {connection?.age}</p>
          {connection?.connectionCreatedAt && (
            <p className="text-xs text-gray-500 mt-2 italic">
              Connected on: {new Date(connection?.connectionCreatedAt).toLocaleString()}
            </p>
          )}

        </div>

        {isRequest ? (
          <div className="flex justify-between mt-4 w-full">
            <button
              onClick={() => onAccept(requestId)}
              className="btn btn-sm px-4 py-2 font-medium rounded-xl border border-pink-400 text-pink-400 transition-transform transform hover:scale-110 focus:ring-2 focus:ring-pink-400 focus:outline-none"
            >
              Accept
            </button>
            <button
              onClick={() => onReject(requestId)}
              className="btn btn-sm px-4 py-2 font-medium rounded-xl border border-violet-400 text-violet-400 transition-transform transform hover:scale-110 focus:ring-2 focus:ring-violet-400 focus:outline-none"
            >
              Reject
            </button>
          </div>
        ):(
          <div className="flex justify-center mt-4 w-full">
            <Link to={`/chat/${connection?._id}`}>
            <button
              className="btn btn-sm px-4 py-2 font-medium rounded-xl border border-pink-400 text-pink-400 transition-transform transform hover:scale-110 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              
            >
              Message
            </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendCard;
