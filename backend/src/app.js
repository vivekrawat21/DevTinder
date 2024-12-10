const express = require("express");
const { adminCheck } = require("./middleware/AdminCheck");
const { isAuthenticated } = require("./middleware/UserAuthentication");

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
// app.use("/*a*/", (req, res) => {
//   res.send(
//     "Hello from a regex where u can hit to url where a is present in it"
//   );
// });

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

//  passing multiple routehandlers in single routes
app.get(
  "/mul",
  (req, res, next) => {
    // 1. If there is no res then the req will go to endless loop and after some time the server will times out and response will not given
    console.log("Route handler 1");
    // res.send("Route handler 1");
    next();
  },
  (req, res, next) => {
    console.log("Route hadler 2");
    // next();  Thiw will not give an error in the client side but this is not a good practice we should not send any response if we are rerouting it to the next;

    // res.send("Route handler 2");
    next();
  },
  (req, res, next) => {
    console.log("Route handler 3");
    // res.send("Route handler 3");
    // next();  if we do this then we will get an error on client side that route not found because we are rerouting to the next route which is not available.
    res.send("final route");
  }
);

app.use("/admin", adminCheck);
app.get("/admin", (req, res) => {
  const data = {
    name: "ALLname",
    id: "00",
  };
  res.json(data);
});

// user authetication middleware
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw new Error("Username or password is not provided");
    }
    res.status(200).json({
      message: `${username} login succesfully`,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

app.get("/getFriends", isAuthenticated, (req, res) => {
  try {
    res.status(200).json({
      message: "You have no friends ugly mf 😭",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

app.get("/h", (req, res) => {
  throw new Error("Not a graceful");
});
app.use("/", (err, req, res, next) => {
  app.use("/", (err, req, res, next) => {
    //Check if the any error occur if we have not handled it gracefully then this route will handle defaulty
    if (err) {
      res.status(500).json({
        message: err.message + " By default error handler",
      });
    }
  }); //Check if the any error occur if we have not handled it gracefully then this route will handle defaulty
  if (err) {
    res.status(500).json({
      message: err.message + ": Error handled by default error handler",
    });
  }
});
app.listen(PORT, () => {
  console.log("Server is listening to the port :", PORT);
});
