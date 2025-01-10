const express = require("express");
const User = require("../models/user.model");
const Connection = require("../models/connections.model");

const userAuth = require("../middleware/userAuth.middleware");
const { connection } = require("mongoose");

const router = express.Router();
router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  const fromUserId = req.user._id;
  const toUserId = req.params.toUserId;
  const status = req.params.status;
  try {
    const allowedStatus = ["interested", "ignored"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: status + " is not valid",
      });
    }

    const validToUserId = await User.findById(toUserId);
    if (!validToUserId) {
      return res.status(404).json({
        message: "no user found!!",
      });
    }

    const isConnectionExist = await Connection.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (isConnectionExist) {
      return res.status(400).json({
        message: "Request already exist",
      });
    }

    const newConnection = await Connection.create({
      fromUserId,
      toUserId,
      status,
    });
    return res.status(200).json({
      message:
        "connection request successfully sent to " +
          status +
          " " +
          validToUserId?.firstName || validToUserId,
      newConnection,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server side error occurred",
      error: error.message,
    });
  }
});

router.post("/request/review/:status/:requestId",userAuth,async(req, res) => {
    const loggedInUserId = req.user._id;
    const { status, requestId } = req.params;
    try {
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Not a valid status" });
      }
      const isValidconnectionRequest = await Connection.findOne({
        _id: requestId,
        toUserId: loggedInUserId,
        status: "interested",
      });
      if (!isValidconnectionRequest) {
        return res.status(404).json({
          message: "Invalid connection request!!",
        });
      }
      isValidconnectionRequest.status = status;
      const updatedConnection = await isValidconnectionRequest.save();
      return res.status(200).json({
        message: "Request " + status + " successfully",
        data: updatedConnection,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server side error occurred",
        error: error.message,
      });
    }
  });

module.exports = router;
