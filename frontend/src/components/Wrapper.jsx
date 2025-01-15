const Wrapper = ({ children }) => {
  return (
    <div className="bg-base-300 min-h-screen flex justify-center ">
      <div className="lg:w-4/5 w-[100vw]">{children}</div>
    </div>
  );
};

export default Wrapper;
