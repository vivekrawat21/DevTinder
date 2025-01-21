import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import Boy from "../assets/Boy.png";
import Girl from "../assets/Girl.png";
import { IoIosMale } from "react-icons/io";
import { IoFemale, IoMaleFemaleOutline } from "react-icons/io5";
import { MdCake } from "react-icons/md";

const UserCard = ({ user, direction, onAction, showActions = true }) => {
  const variants = {
    initial: { x: 0, y: 0, opacity: 1, scale: 1 },
    interested: { x: -500, opacity: 0, scale: 0.6, backgroundColor: "#ddffdd" },
    ignored: { x: 500, opacity: 0, scale: 0.6, backgroundColor: "#ffdddd" },
  };

  const genderIcon =
    user?.gender === "male" ? (
      <IoIosMale className="text-cyan-500 text-lg" />
    ) : user?.gender === "female" ? (
      <IoFemale className="text-pink-500 text-lg" />
    ) : (
      <IoMaleFemaleOutline className="text-yellow-500 text-lg" />
    );

  const genderLabel =
    user?.gender === "male"
      ? "Man"
      : user?.gender === "female"
      ? "Woman"
      : "Others";

  return (
    <div className="flex justify-center items-center mt-24">
      <AnimatePresence>
        {user && (
          <motion.div
            key={user?._id}
            initial="initial"
            animate={direction ? direction : "initial"}
            variants={variants}
            transition={{ duration: 0.4 }}
            className="card shadow-2xl rounded-2xl overflow-hidden w-96 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <div className="card-image flex justify-center items-center pt-4">
              <img
                src={user?.photoUrl || (user?.gender === "male" ? Boy : Girl)}
                className="w-40 h-40 rounded-full object-cover"
                alt="User Profile"
              />
            </div>
            <div className="card-body p-6">
              <h2 className="text-center text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600">
              &lt;{user?.firstName + " " + user?.lastName || "John Doe"}/&gt;
              </h2>
              <div className="flex justify-center items-center gap-7 text-sm mb-3">
                <div className="flex gap-1">
                  <MdCake className="text-lg text-pink-400" />
                  <span>{user?.age || "N/A"} years old</span>
                </div>
                <div className="flex gap-1">
                  {genderIcon}
                  <span>{genderLabel}</span>
                </div>
              </div>
              <p className="text-center text-sm mb-4">
                <b className="border-b-2">Bio</b>
                <b>: </b>
                {user?.about ||
                  "No bio. User is too lazy to write about themselves."}
              </p>
              <div className="flex flex-wrap gap-3 justify-center mt-3">
                {(user?.skills || ["Skill 1", "Skill 2", "Skill 3"]).map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="text-xs font-medium px-3 py-1 rounded-se-full border-2 bg-transparent border-indigo-400 hover:scale-105 transition-transform duration-200"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
              {showActions && (
                <div className="card-actions flex justify-between mt-6">
                  <button
                    onClick={() => onAction("interested", user?._id)}
                    className="w-5/12 px-3 py-2 rounded-xl border border-pink-400 text-pink-400 transition-all duration-200 transform hover:scale-105 hover:bg-pink-400 hover:text-white focus:ring-2 focus:ring-pink-400 focus:outline-none"
                  >
                    Interested
                  </button>
                  <button
                    onClick={() => onAction("ignored", user?._id)}
                    className="w-5/12 px-3 py-2 rounded-xl border border-violet-400 text-violet-400 transition-all duration-200 transform hover:scale-105 hover:bg-violet-400 hover:text-white focus:ring-2 focus:ring-violet-400 focus:outline-none"
                  >
                    Ignore
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    gender: PropTypes.string,
    photoUrl: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.number,
    about: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }),
  direction: PropTypes.string,
  onAction: PropTypes.func,
  showActions: PropTypes.bool,
};

export default UserCard;
