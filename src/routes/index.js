var express = require("express");
var router = express.Router();

const userRoutes = require("./users");
const taskRoutes = require("./tasks");

router.use("/users", userRoutes);
router.use("/task", taskRoutes);

module.exports = router;
