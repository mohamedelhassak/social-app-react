const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const mongoose = require("mongoose");
const userModel = require("../models/user.model");

module.exports = requireLogin = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      error: "you must be authentifaced..",
    });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be authentifaced.." });
    }
    const { _id } = payload;
    userModel.findById(_id).then((userData) => {
      req.user = userData;
    });

    // to continue next ...
    next();
  });
};
