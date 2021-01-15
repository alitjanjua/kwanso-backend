const express = require("express");
const userController = require("../controllers/user");

var router = express.Router();

/* GET users listing. */
router.post("/register", userController.addUser);

router.post("/login", userController.login);

router.get("/user", userController.getUser);

module.exports = router;
