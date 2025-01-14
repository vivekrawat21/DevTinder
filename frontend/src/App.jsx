import Body from "./components/Body";
import Wrapper from "./components/Wrapper";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";

const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Wrapper><Body/></Wrapper>}>
            <Route path="/" element={<Feed/>}/>
           <Route path="/login" element={<Login />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
