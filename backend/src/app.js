const express = require("express");
const connectDb = require("./config/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middleware/userAuth");
const validateUser = require("../utils/validateUser");
const User = require("./models/user.model");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    validateUser(req);
    const user = new User(req.body);
    const created = await user.save();
    res.status(201).json({
      message: "User created successfully",
      user: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server side error occurred",
      error: error.message,
    });
  }
});

// Sign-in Route
app.get("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const result = await user.validatePassword(password);
    if (!result) {
      return res.status(404).json({ message: "Incorrect Password" });
    }
    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 3600000),
    });

    res.status(200).json({ message: "User login successful" });
  } catch (error) {
    res.status(500).json({
      message: "Server side error occurred",
      error: error.message,
    });
  }
});

// Authenticated Routes
app.get("/profile", userAuth, async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({
      message: "Server side error occurred",
      error: error.message,
    });
  }
});

// connection-req check
app.get("/connection-req", userAuth, (req, res) => {
  try {
    res.json({ message: "connection request sent by" + req?.user?.firstName });
  } catch (error) {
    res.status(500).json({
      message: "Server side error occurred",
      error: error.message,
    });
  }
});

// Database Connection and Server Start
connectDb()
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error while connecting to DB: " + err.message);
  });
