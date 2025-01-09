const validator = require("validator");
const validateUser = (req) => {
  if (!req.body.FirstName && !req.body.email && !req.body.password) {
    throw new Error("Please provide required fields");
  }
  if (!validator.isEmail(req.body.email)) {
    throw new Error("Invalid email");
  }
  if (!validator.isStrongPassword(req.body.password)) {
    throw new Error(
      "Password is not strong. It must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol."
    );
  }
};
const validateEditProfileFields = (req) => {
  const allowedEditField = [
    "firstName",
    "lastName",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];
  if (!validator.isURL(req.body.photoUrl)) {
    throw new Error("Image Url is not a valid");
  }
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditField.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validateUser, validateEditProfileFields };
