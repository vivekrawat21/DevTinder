const expess = require("express");
const connectDb = require("./config/dbConfig");
const app = expess();
const User = require("./models/user.model");
const PORT = 3000;

app.post("/signup", async (req, res) => {
  const userInfo = {
    firstName: "Vivek",
    lastName: "Rawat",
    email: "vivekrwt2111@gmail.com",
    password: "Vivek2002@123",
    age: 22,
    gender: "male",
  };

  try {
    const user = new User({ ...userInfo });
    const created = await user.save();

    if (created) {
      res.status(200).json({
        message: "User created successfully" + created,
      });
    } else {
      throw new Error("User cannot be created");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

connectDb()
  .then(() => {
    console.log("database connection successful");
    app.listen(PORT, () => {
      console.log("app is listening to port: " + PORT);
    });
  })
  .catch((err) => {
    console.error("Error while connecting to db: " + err.message);
  });
