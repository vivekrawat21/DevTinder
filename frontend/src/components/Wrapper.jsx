
const Wrapper = ({ children }) => {
  return (
    <div className="min-h-screen flex justify-center ">
      <div className="w-4/5">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
