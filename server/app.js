const express = require("express");
const mongoose = require("mongoose");
const baodyParser = require("body-parser");
const { MONGOURL } = require("./config/keys");

const app = express();
const PORT = 5000;

//import models
require("./models/user.model");

//use body parser middleware
app.use(baodyParser.json());

//use routes
app.use(require("./routes/auth"));

//connect to mongodb using mongoose
mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected successfuly...");
});

mongoose.connection.on("error", (err) => {
  console.log("error in connection", err);
});

app.get("/", (req, res, next) => {
  res.send("dfdf");
});

//LISTEN TO PORT
app.listen(PORT, () => {
  console.log("server is running on ", PORT);
});
