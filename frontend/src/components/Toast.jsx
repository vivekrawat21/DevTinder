// Toast.js
import { useEffect, useState } from "react";

const Toast = ({ message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (message) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [message]);

  return (
    show && (
      <div
        className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg"
        role="alert"
      >
        {message}
      </div>
    )
  );
};

export default Toast;
