const express = require("express");
const connectDB = require("./config/dbConfig");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const serverless = require("serverless-http");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/connection");
const userRouter = require("./routes/user");

dotenv.config();

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routers
app.use("/api", authRouter);
app.use("/api", profileRouter);
app.use("/api", requestRouter);
app.use("/api", userRouter);

// Database Connection
connectDB()
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("❌ Error connecting to DB:", err.message);
  });

// Sample API route
app.get("/", (req, res) => {
  res.json({ message: "Hello from Vercel with MongoDB!" });
});


module.exports = app;
module.exports.handler = serverless(app);
