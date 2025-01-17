import UserCard from "./userCard";
import users from "../db/MockData";

const Feed = () => {
  return (
    <>
      <div className="flex mt-20 justify-center ">
       
          <UserCard users={users} />
        
      </div>
    </>
  );
};
export default Feed;
