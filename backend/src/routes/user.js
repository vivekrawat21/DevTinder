const express = require("express");
const userAuth = require("../middleware/userAuth.middleware");
const Connection = require("../models/connections.model");
const User = require("../models/user.model");
const router = express.Router();
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";
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

router.get("/user/feed", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  // const page = parseInt(req.query.page) || 1;
  // let limit = parseInt(req.query.limit) || 10;
  // if (limit > 50) {
  //   limit = 10;
  // }
  try {
    const connectionRequest = await Connection.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId , toUserId");
    const hideUserFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId);
      hideUserFromFeed.add(req.toUserId);
    });

    const feed = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      // .skip((page - 1) * limit)
      // .limit(limit);
    return res.status(200).json({ message: "feed fetched succefully", feed });
  } catch (error) {
    return res.status(500).json({
      message: "server side error occured",
      error: error,
    });
  }
});

module.exports = router;
