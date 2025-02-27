const express = require("express");
const userAuth = require("../middleware/userAuth.middleware");
const Chat = require("../models/chat.model");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/chat/:targetUserId", userAuth, async (req, res) => {
    try {
        const { targetUserId } = req.params;
        console.log(targetUserId);
        const userId = req.user._id;
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const targetObjectId = new mongoose.Types.ObjectId(targetUserId);

        let chat = await Chat.findOne({
            participants: { $all: [userObjectId, targetObjectId] }
        }).populate({
            path: "messages.senderId",
            select: "firstName lastName"
        });
        console.log(chat);
        if (!chat) {
            console.log("Chat not found creating a new");
            chat = new Chat({
                participants: [userObjectId, targetObjectId],
                messages: []
            })
            await chat.save();
        }

        return res.status(200).json({ chat, message: "Chat fetched successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error", error });

    }
});

module.exports = router;