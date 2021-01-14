const express = require("express");
const userController = require("../controllers/user");

var router = express.Router();

/* GET users listing. */
router.post("/", userController.addUser);

router.post("/login", userController.login);

router.get("/", userController.getUser);

module.exports = router;
