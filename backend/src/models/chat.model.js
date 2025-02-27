const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'

    },
    text: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 1000
    }
}, {
    timestamps: true
})



const chatSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }],
    messages: [messageSchema],
}, {
    timestamps: true
})


module.exports = mongoose.model('Chat', chatSchema);