const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token; 
    if (!token) {
      return res.status(401).json({ message: "Invalid token. Please login again" });
    }

    const { _id } = jwt.verify(token, "SECRET"); 
    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).json({ message: "Invalid token. User is not found" });
    }

    req.user = user; 
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Authentication failed", error: error.message });
  }
};

module.exports = { userAuth };
