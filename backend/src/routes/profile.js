const express = require("express");
const { validateEditProfileFields } = require("../../utils/validateUser");
const User = require("../models/user.model");
const userAuth = require("../middleware/userAuth.middleware");
const { ObjectId } = require('mongodb');
const USER_SAFE_DATA = "firstName lastName photoUrl about skills gender age";
const router = express.Router();
router.get("/profile/view", userAuth, async (req, res) => {
  try {
    return res.status(200).json({
      message: "Profile fetched successfully",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server side error occurred",
      error: error.message,
    });
  }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const validateEditProfileData = validateEditProfileFields(req);
    if (!validateEditProfileData) {
      return res.status(400).json({
        message: "Invalid edit request",
      });
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    const user = await loggedInUser.save();
    if (!user) {
      res.status(400).json({ message: "Profile is not updated" });
    }
    return res
      .status(200)
      .json({ message: "Profile updated successfully", updatedProfile: user });
  } catch (error) {
    return res.status(500).json({
      message: "Server side error occurred",
      error: error.message,
    });
  }
});

router.get("/profile/:userId", userAuth, async (req, res) => {
  const userId = req.params.userId;
  try {
    const objectId = new ObjectId(userId);
    const user = await User.findById(objectId).select(USER_SAFE_DATA);
   
    
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server side error occurred",
      error: error.message,
    });
  }
}
);
module.exports = router;
