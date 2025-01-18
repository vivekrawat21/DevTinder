import { useState } from "react";
import { useSelector } from "react-redux";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import UserCard from "./userCard";
import { FaSave } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [Loading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    photoUrl: user.photoUrl,
    gender: user.gender,
    age: user.age,
    about: user.about,
    skills: user.skills,
  });

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
      console.log("Saved Data:", editData);
      const res = await axios.patch(`${BACKEND_URL}/profile/edit`, editData, {
        withCredentials: true,
      });
      console.log("Response:", res);
      if (res.status === 200) {
        toast.success(res.data.message || "Profile updated successfully!");
        setIsLoading(false);
        setIsEditing(false);
      }
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred.");

      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center px-4 py-6 mt-10">
      {!isEditing && (
        
      <>
      <span className="invisible">Profile</span>
        <div className="flex flex-col sm:flex-row sm:w-5/6 w-full bg-base-200 p-6 rounded-2xl transition-all duration-300  ">
          
          <div className="flex flex-col items-center sm:w-1/3 w-full text-center sm:text-left mb-6 sm:mb-0 justify-center">
            <img
              src={user.photoUrl || editData.photoUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 border-4 border-gray-300"
            />
            <button
              onClick={handleEditToggle}
              className="text-gray-600 text-sm cursor-pointer hover:underline font-bold flex items-center gap-1"
            >
              <FaEdit />
              Edit
            </button>
          </div>
          <div className="flex flex-col sm:w-2/3 w-full px-4">
            <h3 className="text-lg font-bold mb-4">Profile Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(editData).map(([key, value]) =>
                key !== "photoUrl" && key !== "skills" ? (
                  <div
                    key={key}
                    className={key === "about" ? "col-span-2" : ""}
                  >
                    <span className="text-sm text-gray-600">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </span>
                    <p className="text-base">{value}</p>
                  </div>
                ) : null
              )}
              <div className="col-span-2">
                <span className="text-sm text-gray-600">Skills:</span>
                <p className="text-base">{editData.skills.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </>
      )}

      {isEditing && (
        <div className="flex flex-col lg:flex-row sm:w-6/6 w-full bg-base-200 p-6 rounded-2xl  items-center justify-between">
          <div className="flex-1 ">
            <div className="flex items-center  justify-between">
              <button
                onClick={handleEditToggle}
                className="text-gray-600 text-xl flex items-center gap-2 mb-2"
              >
                <FaArrowLeft />
              </button>
              <button
                type="submit"
                onClick={handleSave}
                className="flex items-center justify-center"
              >
                <FaSave className="inline-block" />
                <span className="text-green-300 font-bold ml-1">
                  {Loading ? (
                    <span className="loading loading-spinner text-success"></span>
                  ) : (
                    "save"
                  )}
                </span>
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="grid grid-cols-2 gap-6">
                {Object.keys(editData).map((key) =>
                  key === "skills" ? (
                    <div className="col-span-2" key={key}>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Skills (Comma Separated)
                      </label>
                      <input
                        type="text"
                        name={key}
                        value={editData.skills.join(", ")}
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
                  ) : key === "gender" ? (
                    <div className="col-span-2" key={key}>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Gender
                      </label>
                      <select
                        name={key}
                        value={editData[key]}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  ) : (
                    <div
                      className={key === "about" ? "col-span-2" : ""}
                      key={key}
                    >
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      <input
                        type={key === "age" ? "number" : "text"}
                        name={key}
                        value={editData[key]}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                  )
                )}
              </div>
            </form>
          </div>
          <div className="flex-1 mt-auto ml-2">
            <UserCard user={editData} showActions={false} />
          </div>
        </div>
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default Profile;
