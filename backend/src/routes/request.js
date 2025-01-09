const express = require("express");

const userAuth = require("../middleware/userAuth.middleware");

const router = express.Router();
router.get("/request", userAuth, (req, res) => {
  try {
    return res.json({
      message: "connection request sent by" + req?.user?.firstName,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server side error occurred",
      error: error.message,
    });
  }
});

module.exports = router;
