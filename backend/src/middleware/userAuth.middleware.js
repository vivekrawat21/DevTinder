const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userAuth = async (req, res, next) => {
  const USER_SAFE_DATA = "firstName lastName photoUrl gender age about skills";
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Invalid token. Please login again" });
    }

    const { _id } = jwt.verify(token, "SECRET");

    if (!_id) {
      return res
        .status(401)
        .json({ message: "Invalid token. Please login again" });
    }

    const user = await User.findById(_id).select(USER_SAFE_DATA);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Authentication failed", error: error.message });
  }
};

module.exports = userAuth;
