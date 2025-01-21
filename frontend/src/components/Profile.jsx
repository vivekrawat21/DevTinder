import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaArrowLeft, FaSave } from "react-icons/fa";
import UserCard from "./userCard";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";
import { setUser } from "../fetures/userAuth/userSlice";
import Boy from "../assets/Boy.png";
import Girl from "../assets/Girl.png";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const userFromRedux = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    photoUrl: "",
    gender: "",
    age: "",
    about: "",
    skills: [],
  });
  const fetchUser = async () => {
    try {
      if (userFromRedux) {
        setEditData({
          firstName: userFromRedux?.firstName || "",
          lastName: userFromRedux?.lastName || "",
          photoUrl: userFromRedux?.photoUrl || "",
          gender: userFromRedux?.gender || "Male",
          age: userFromRedux?.age || "",
          about: userFromRedux?.about || "",
          skills: userFromRedux?.skills || [],
        });
        return;
      }
      const res = await axios.get(`${BACKEND_URL}/profile/view`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        const { firstName, lastName, photoUrl, gender, age, about, skills } =
          res.data.user;
        const userData = {
          firstName,
          lastName,
          photoUrl,
          gender,
          age,
          about,
          skills: skills || [],
        };

        dispatch(setUser(userData));
        setEditData(userData);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error fetching user data."
      );
    }
  };

  useEffect(() => {
   

    fetchUser();
  }, [userFromRedux, dispatch]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.patch(`${BACKEND_URL}/profile/edit`, editData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(setUser(res.data.updatedProfile));
        setIsEditing(false);
        console.log("Updated Profile:", res.data.updatedProfile);
        toast.success("Profile updated successfully.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center px-4 py-6">
      {!isEditing ? (
        <>
          <span className="invisible">Profile</span>
          <div className="flex flex-col sm:flex-row sm:w-6/6 w-full bg-base-200 p-6 rounded-2xl transition-all duration-300 " style={{ minHeight: "450px" }}>
            <div className="flex flex-col items-center sm:w-1/3 w-full text-center sm:text-left mb-6 sm:mb-0 justify-center">
              <img
                src={
                  editData?.photoUrl ||
                  (editData?.gender == "male" ? Boy : Girl)
                }
                alt="Profile"
                className="w-32 h-32 rounded-full mb-4 border-4 border-gray-300"
              />
              <button
                onClick={handleEditToggle}
                className="text-gray-600 text-md cursor-pointer hover:underline font-bold flex items-center gap-1"
              >
                <FaEdit />
                Edit
              </button>
            </div>
            <div className="flex flex-col sm:w-2/3 w-full px-4">
              <h3 className="text-2xl   mb-7 font-bold font-sans bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent  hover:bg-gradient-to-r hover:from-cyan-400 hover:via-cyan-600 hover:to-blue-600 mr-1">
                Profile Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">First Name:</span>
                  <p className="text-base">{editData.firstName || "N/A"}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Last Name:</span>
                  <p className="text-base">{editData.lastName || "N/A"}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Gender:</span>
                  <p className="text-base">{editData.gender || "N/A"}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Age:</span>
                  <p className="text-base">{editData.age || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-sm text-gray-600">About:</span>
                  <p className="text-base">{editData.about || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-sm text-gray-600">Skills:</span>
                  <p className="text-base">
                    {editData.skills?.join(", ") || "No skills added"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col lg:flex-row sm:w-6/6 w-full bg-base-200 p-5 rounded-2xl items-center justify-between">
          <div className="flex-1">
            <form onSubmit={handleSave}>
              <div className="flex justify-between mb-3">
                <button>
                  <FaArrowLeft
                    onClick={handleEditToggle}
                    className="text-gray-600 text-xl cursor-pointer hover:underline"
                  />
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 font-semibold text-xl  "
                >
                  <FaSave />
                  {isLoading ? (
                    <span className="loading loading-spinner  "></span>
                  ) : (
                    "save"
                  )}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={editData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={editData.age}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    About
                  </label>
                  <textarea
                    name="about"
                    value={editData.about}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    name="photoUrl"
                    value={editData.photoUrl}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Skills (Comma Separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={editData?.skills.join(", ")}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        skills: e.target.value
                          .split(",")
                          .map((skill) => skill.trim()),
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="flex-1 mt-auto ml-2">
            <UserCard user={editData} showActions={false} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
