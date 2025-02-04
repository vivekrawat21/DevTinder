const express = require("express");
const { validateUser } = require("../../utils/validateUser");
const User = require("../models/user.model");

const router = express.Router();
const transformUser = (user) => {
  if (user) {
    const userObj = user.toObject();
    delete userObj.password; 
    return userObj;
  }
  return null;
};

router.post("/signup", async (req, res) => {
  try {
    validateUser(req);
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User(req.body);
    const created = await user.save();

    return res.status(200).json({
      message: "User created successfully",
      data: transformUser(created), 
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      
    });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const result = await user.validatePassword(password);
    if (!result) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = await user.getJWT();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none', // For cross-origin requests
      domain: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'localhost',
      expires: new Date(Date.now() + 24 * 3600000), // 24 hours
    });

    return res.status(200).json({
      message: "User login successful",
      user: transformUser(user), // Exclude password
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server side error occurred",
      error: error.message,
    });
  }
});
router.get("/signout", (req,res) => {
  try {
    // Clear the authentication token
    res.cookie("token", "", {
      expires: new Date(Date.now()),
    });
    return res.status(200).json({ message: "User logged out successfully" });
    
  } catch (error) {
    return res.status(500).json({
      message: "Server-side error occurred",
      error: error.message,
    });
  }
});

router.patch("/forgetpassword", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User is not valid" });
    }
    user.password = password;
    const updatedUser = await user.save();
    return res.status(200).json({
      message: "password updated Successfully",
      passwordHash: updatedUser.password,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server side error occurred",
      error: error.message,
    });
  }
});
module.exports = router;
