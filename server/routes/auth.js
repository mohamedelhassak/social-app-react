const express = require("express");
const router = express.Router();
require("../controllers/auth.controller");
const requireLogin = require("../middlewares/requireLogin");

//auth routes
router.get(
  "/protected",
  requireLogin /* this middlewarw will be executed BEFORE this request */,
  hello
);

router.post("/signin", signin);

router.post("/signup", signup);

module.exports = router;
