const express = require("express");

const app = express();

const PORT = 3000;

// route handling using router handler
app.use("/health-check", (req, res) => {
  res.send("Health is great 😃");
});

// app.use("/", (req, res) => {
//   res.send("Hello from root");
// });

// How to check the custom request route only.
app.use(express.json());

// get
app.get("/user", (req, res) => {
  res.send("Hello from the get route ✋🏻");
});

// post
app.post("/user", (req, res) => {
  const { name, password } = req.body;
  console.log(name, password);
  res.send({
    name,
    password,
  });
});

// delete
app.delete("/user", (req, res) => {
  const { user } = req.query;
  res.send(`${user} is deleted successfully`);
});

// Regex for routing
app.use("/*a*/", (req, res) => {
  res.send(
    "Hello from a regex where u can hit to url where a is present in it"
  );
});

app.use("/*sh$", (req, res) => {
  res.send("hello kush");
});

//dynamic routes query and parameters

// query
app.get("/query", (req, res) => {
  const { id } = req.query;
  res.send(id);
});

// dynamic route parameter
app.get("/prm/:id", (req, res) => {
  const id = req.params;
  res.send(id);
});

app.listen(PORT, () => {
  console.log("Server is listening to the port :", PORT);
});
