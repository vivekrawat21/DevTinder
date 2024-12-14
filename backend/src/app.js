const express = require("express");
const connectDb = require("./config/dbConfig");
const app = express();
const User = require("./models/user.model");
const PORT = 3000;

app.use(express.json());

// Signup Route
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    const created = await user.save();
    if (created) {
      res.status(201).json({
        message: "User created successfully",
        user: created,
      });
    } else {
      res.status(400).json({
        message: "User not created",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server side error occurred",
      error: error.message,
    });
  }
});

// Get User by ID
app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server side error occurred",
      error: error.message,
    });
  }
});

// Get All Users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    if (users.length > 0) {
      res.status(200).json({ message: "Users fetched successfully", users });
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server side error",
      error: error.message,
    });
  }
});

// Delete User
app.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).json({
        message: "User deleted successfully",
        user,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server side error",
      error: error.message,
    });
  }
});

// Update User
app.patch("/user/:id", async (req, res) => {
  const APPLIED_UPDATES = ["photoUrl", "about", "skills", "age","firstName","lastName","about"];
  const isUpdateAllowed = Object.keys(req.body).every((update) =>
    APPLIED_UPDATES.includes(update)
  );
  if (!isUpdateAllowed) {
    return res.status(400).json({
      message: "Cannot update the provided fields",
    });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after", // Return updated document
      runValidators: true, // Ensure validation rules are applied
    });
    if (user) {
      res.status(200).json({
        message: "User updated successfully",
        user,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server side error",
      error: error.message,
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "An unexpected error occurred",
    error: err.message,
  });
});

// Database Connection and Server Start
connectDb()
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error while connecting to DB: " + err.message);
  });
