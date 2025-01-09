const express = require("express");
const bcrypt = require("bcryptjs");
const { validateUser } = require("../../utils/validateUser");
const User = require("../models/user.model");

const router = express.Router();
router.post("/signup", async (req, res) => {
  try {
    validateUser(req);
    const user = new User(req.body);
    const created = await user.save();
    return res.status(201).json({
      message: "User created successfully",
      user: created,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server side error occurred",
      error: error.message,
    });
  }
});

router.get("/signin", async (req, res) => {
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
      expires: new Date(Date.now() + 24 * 3600000),
    });

    return res.status(200).json({ message: "User login successful" });
  } catch (error) {
    return res.status(500).json({
      message: "Server side error occurred",
      error: error.message,
    });
  }
});

router.post("/signout", (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    return res.status(200).json({ message: "User loggedout successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Server side error occurred",
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
