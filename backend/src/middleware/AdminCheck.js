const adminCheck = (req, res, next) => {
  const {name,password} = req.body;
  if (name!="admin" || password!="admin") {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};
module.exports = {adminCheck};