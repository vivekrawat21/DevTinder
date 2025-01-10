const express = require("express");
const userAuth = require("../middleware/userAuth.middleware");
const Connection = require("../models/connections.model");

const router = express.Router();
const USER_SAFE_DATA = "firstName lastName photoURL";
router.get("/user/requests/received", userAuth, async (req, res) => {
  const loggedInuser = req.user;
  try {
    const requests = await Connection.find({
      toUserId: loggedInuser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    if (requests.length == 0) {
      return res.status(404).json({
        message: "No request found!",
      });
    }
    return res
      .status(200)
      .json({ message: "requests fetched succesfully", requests });
  } catch (error) {
    return res.status(500).json({
      message: "Server side error occurred",
      error: error.message,
    });
  }
});

router.get("/user/connections", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  try {
    const connections = await Connection.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    if (connections.length == 0) {
      return res.status(404).json({
        message: "No connection found!!",
      });
    }
    const connectionData = connections.map((connection) =>
      loggedInUser.toString() === connection.fromUserId.toString()
        ? connection.toUserId
        : connection.fromUserId
    );
    return res.status(200).json({
      message: "connection fetched successfully",
      data: connectionData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server side error occurred",
      error: error.message,
    });
  }
});
module.exports = router;
