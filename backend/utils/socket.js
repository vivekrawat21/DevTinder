const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../src/models/chat.model")

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
            console.log(firstName, "joined");
            const room = crypto.createHash("sha256").update([userId, toUserId].sort().join('_')).digest("hex");
            console.log(room);
            socket.join(room);

        });
        socket.on("sendMessage", async ({ text, sender, receiver }) => {
            try {
                const roomId = crypto.createHash("sha256").update([sender, receiver].sort().join('_')).digest("hex");
                console.log(text);
                io.to(roomId).emit("receiveMessage", { text, sender});


                let chat = await Chat.findOne({
                    participants: { $all: [sender, receiver] }
                });

                if (!chat) {
                    chat = new Chat({
                        participants: [sender, receiver],
                        messages: []
                    });

                    await chat.save();
                }
                chat.messages.push({ senderId: sender, text });
                await chat.save();
            } catch (error) {
                console.log(error);


            }

        });
    });
    io.on("disconnect", () => {

        console.log("User disconnected");
    });
}

module.exports = InitializeServer;