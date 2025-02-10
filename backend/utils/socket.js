const socket = require("socket.io");
const crypto = require("crypto");

const InitializeServer = (server) => {
    console.log("Socket server initialized");
    const io = socket(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
        },
    });

    io.on("connection", (socket) => {
        console.log("User connected");

        socket.on("join", ({ userId, toUserId, firstName }) => {
            console.log(firstName, " joined");
            const room = crypto.createHash("sha256").update([userId, toUserId].sort().join('_')).digest("hex");
            console.log(room);
            socket.join(room);

        });
        socket.on("sendMessage", ({ text, sender, receiver }) => {
            const roomId = crypto.createHash("sha256").update([sender, receiver].sort().join('_')).digest("hex");
            console.log(text);
            io.to(roomId).emit("receiveMessage", { text, sender });

        });
    });
    io.on("disconnect", () => {

        console.log("User disconnected");
    });
}

module.exports = InitializeServer;