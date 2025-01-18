import { IoLogoGithub } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";

const FloatingBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const hideBanner = () => {
    setIsVisible(false);
  };

  return (
    <div className="hidden sm:fixed sm:bottom-5 sm:right-5 p-4 rounded-lg shadow-lg sm:flex items-center justify-between transition-all duration-300 cursor-pointer ">
      <Link to="https://github.com/vivekrawat21" target="_blank" rel="noopener noreferrer">
        <IoLogoGithub className="text-3xl mr-2 text-blue-400" />
      </Link>

      {isVisible && (
        <div className="flex items-center">
          <span className="mr-3 text-lg">Check out my GitHub!</span>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded-full"
            onClick={hideBanner}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingBanner;
