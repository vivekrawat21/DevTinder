const validator = require("validator");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 20,
    },
    lastName: {
      type: String,
      minLength: 1,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password is not strong. It must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol."
          );
        }
      },
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Invalid entry for gender");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 80,
      required: true,
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
      validate(value) {
        if (value && value.length < 10) {
          throw new Error("About must be at least 10 characters long");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.getJWT = function () {
  const token = jwt.sign({ _id: this._id }, "SECRET", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const isValidPassword = await bcrypt.compare(
    passwordInputByUser,
    this.password
  );
  return isValidPassword;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
