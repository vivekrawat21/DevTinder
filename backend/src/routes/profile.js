const express = require("express");
const { validateEditProfileFields } = require("../../utils/validateUser");


const userAuth = require("../middleware/userAuth.middleware");

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

module.exports = router;
