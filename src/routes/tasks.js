const express = require("express");
const taskController = require("../controllers/task");

const middlewares = require("../middlewares");

var router = express.Router();

// router.use(middlewares.verifyToken, middlewares.attachUser);

router.post("/create-task", taskController.createTask);

router.get("/list-tasks", taskController.getUserTasks);

module.exports = router;
