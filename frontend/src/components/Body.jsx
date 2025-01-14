import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Body = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
export default Body;
