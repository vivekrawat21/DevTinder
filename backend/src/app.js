const express = require("express");
const connectDb = require("./config/dbConfig");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

// routers
app.use('/api/',authRouter);
app.use('/api/',profileRouter);
app.use('/api/',requestRouter);


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
