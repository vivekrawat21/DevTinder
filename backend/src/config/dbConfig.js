const mongoose = require('mongoose');

const connectDb = async()=>(await mongoose.connect(
        "mongodb+srv://vivekrawat:vivek2002@cluster0.32der.mongodb.net/devTinder"
    ));

module.exports = connectDb;