import Footer from "./Footer";

const Wrapper = ({ children }) => {
  return (<>
    <div className=" min-h-screen flex justify-center ">
      <div className="w-3/5  ">{children}</div>
    </div>
    <Footer />
    </>
  );
};

export default Wrapper;
