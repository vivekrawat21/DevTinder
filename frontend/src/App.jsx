import Body from "./components/Body";
import Wrapper from "./components/Wrapper";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import Profile from "./components/Profile";

const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
        <Route path="/login" element={<Login />}/>
          <Route path="/" element={<Wrapper><Body/></Wrapper>}>
            <Route path="/" element={<Feed/>}/>
           <Route path="/profile" element={<Profile />}/>
          </Route>
         
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
