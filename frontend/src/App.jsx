import Body from "./components/Body";
import Wrapper from "./components/Wrapper";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import SignUp from "./components/SingUp";
import Request from "./components/Request";
import User from "./components/User";

const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
          <Route path="/" element={<Wrapper><Body/></Wrapper>}>
            <Route path="/" element={<Feed/>}/>
           <Route path="/profile" element={<Profile />}/>
           <Route path="/user/:id" element={<User />}/>
           <Route path="/connections" element={<Connections />}/>
           <Route path="/requests" element={<Request />}/>
           </Route>
         
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
