var express = require("express");
var router = express.Router();

const userRoutes = require("./users");
const taskRoutes = require("./tasks");

router.use("/", userRoutes);
router.use("/", taskRoutes);

module.exports = router;
