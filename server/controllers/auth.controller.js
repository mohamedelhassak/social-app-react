const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

module.exports = hello = (req, res) => {
  res.send("secret yooow");
};

//sighn up
module.exports = signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(442).json({ error: "please fill all ..." });
  }
  // check if user already exist
  await userModel.findOne({ email: email }).then(async (saavedUser) => {
    if (saavedUser) {
      return res.status(442).json({ error: "Email already taken .." });
    }

    //if not than add the user
    //// hashing password
    bcrypt.hash(password, 10).then(async (hashedPassword) => {
      user = new userModel({
        name,
        email,
        password: hashedPassword,
      });
      await user
        .save()
        .then((user) => {
          res.send({ mesaage: "successfuly added..", user: { name, email } });
        })
        .catch((err) => console.log(err));
    });
  });
};

//sign in
module.exports = signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(442).json({ error: "please fill all ..." });
  }

  /// find user from mongodb
  await userModel.findOne({ email: email }).then((saavedUser) => {
    if (!saavedUser) {
      return res.status(442).json({ error: "Invalid email or password" });
    }
    bcrypt
      .compare(password, saavedUser.password)
      .then((doMath) => {
        if (doMath) {
          //generate token && sen it
          const token = jwt.sign({ _id: saavedUser._id }, JWT_SECRET);
          return res.json({ token: token });
        } else {
          return res.status(442).json({ error: "Invalid email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  res.send({ mesaage: "successfuly founded..", user: { name, email } });
};
