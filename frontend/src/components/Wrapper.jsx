import Footer from "./Footer";

const Wrapper = ({ children }) => {
  return (
    <>
      <div className=" min-h-screen flex justify-center ">
        <div className="sm:w-3/5 w-full ">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Wrapper;
