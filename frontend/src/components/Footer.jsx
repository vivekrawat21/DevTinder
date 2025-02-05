const Footer = () => {
  return (
    <footer className="bg-base-200 text-white py-6 mt-12 max-w-[95vw] mx-auto rounded-xl shadow-2xl
    ">
      <div className="max-w-screen-xl mx-auto px-6 text-center">
        <p className="text-sm text-gray-400">
          Made with
          <span className="text-blue-500"> ❤️ </span> 
          <span className="font-bold ">dev.</span>
          <span className="font-bold text-blue-400">Tinder</span>
        </p>
        <div className="mt-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} DevTinder. All Rights Reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
