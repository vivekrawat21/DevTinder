const express = require("express");

const app = express();

const PORT = 3000;

// route handling using router handler
app.use("/health-check", (req, res) => {
  res.send("Health is great 😃");
});

app.use("/", (req, res) => {
  res.send("Hello from root");
});

app.listen(PORT, () => {
  console.log("Server is listening to the port :", PORT);
});
