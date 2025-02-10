import { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import createSocketConnection from "../../utils/socket";

const socket = createSocketConnection(); // Ensure socket is initialized once

const Chat = () => {
  const { toUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const user = useSelector((state) => state.user);
  const userId = user?._id;

  useEffect(() => {
    if (!userId || !user?.firstName) return;

    console.log("🔗 Connecting to socket...");
    console.log("📡 Sending join request:", { userId, toUserId });

    socket.emit("join", { userId, toUserId, firstName: user.firstName });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    socket.on("joined", (room) => {
      console.log("✅ Successfully joined room:", room);
    });

    socket.on("receiveMessage", ({ text, sender }) => {
      console.log("📩 Message received:", { text, sender });

      setMessages((prevMessages) => [...prevMessages, { text, sender }]);
    });

    return () => {
      console.log("🔌 Cleaning up socket listeners...");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("joined");
      socket.off("receiveMessage");
    };
  }, [toUserId, userId, user]);

  const sendMessage = () => {
    if (!input.trim()) return;

    console.log("🚀 Sending message:", { text: input, sender: userId, receiver: toUserId });

    // Send message to backend, but DON'T update state locally
    socket.emit("sendMessage", { text: input, sender: userId, receiver: toUserId });
    setInput(""); // Clear input field
  };

  return (
    <div className="flex flex-col border h-[80vh] w-[50vw] rounded-xl p-4 shadow-lg m-auto mt-10">
      <div className="flex items-center justify-between mb-2 p-2 rounded-t-xl">
        <div className="flex items-center">
          <img src="../assets/Boy.png" className="rounded-full border border-white w-10 h-10 mr-2" />
          <h1 className="text-lg font-semibold">{toUserId}</h1>
        </div>
        <span className="text-green-500 font-semibold">Online</span>
      </div>
      <hr className="mb-2" />
      <div className="flex flex-col flex-grow overflow-y-auto space-y-2 p-2">
        {messages.map((msg, index) => (
          <div key={index} className={`chat ${msg.sender === userId ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Avatar"
                  src={msg.sender === userId ? user?.photoUrl : "sender-profile-url"}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold mb-1">{msg.sender === userId ? "You" : toUserId}</span>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 p-2 border-t rounded-b-xl">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button onClick={sendMessage} className="bg-gradient-to-r from-cyan-400 to-cyan-600 p-2 rounded-full flex items-center justify-center">
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
