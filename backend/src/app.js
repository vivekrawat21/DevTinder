const express = require("express");
const connectDb = require("./config/dbConfig");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const http = require("http");
const InitializeServer = require("../utils/socket");


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/connection");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const cors = require("cors");


dotenv.config();

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};




app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// routers
app.use("/api/", authRouter);
app.use("/api/", profileRouter);
app.use("/api/", requestRouter);
app.use("/api/", userRouter);
app.use("/api/", chatRouter);

// Database Connection and Server Start
const server = http.createServer(app);

InitializeServer(server);

connectDb()
  .then(() => {
    console.log("Database connection successful");
    server.listen(process.env.PORT, () => {
      console.log(`App is listening on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error while connecting to DB: " + err.message);
  });
